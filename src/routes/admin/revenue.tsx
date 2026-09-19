import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { supabase } from "@/lib/supabase";
import { fetchArtists } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/revenue")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminRevenuePage,
});

function AdminRevenuePage() {
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const [artistId, setArtistId] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ updated: number; errors: string[] } | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!artistId || !file || !month) {
      setError("Select artist, month and file");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("Not authenticated");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("month", month);
      formData.append("artist_id", artistId);
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-revenue`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardPage title="Revenue" subtitle="Upload monthly revenue sheet to update artist earnings.">
      <SectionCard title="Upload revenue sheet" eyebrow="Monthly">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select an artist and upload their monthly sheet. CSV format: <code className="rounded bg-muted px-1">release_title, amount, streams</code> with header row.
            Example: <code className="rounded bg-muted px-1">DUDUKE, 500000, 120000</code>
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Artist *</label>
              <select value={artistId} onChange={(e) => setArtistId(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
                <option value="">Select artist</option>
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CSV file</label>
              <Input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {result && (
            <div className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-medium">Updated {result.updated} records for {month}</p>
              {result.errors.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                  {result.errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleUpload} disabled={loading || !file}>
              {loading ? "Uploading..." : "Upload and update revenue"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This will create/update <code>revenue_entries</code> and sum totals into <code>releases.revenue/streams</code>. Artists will see updated revenue on <strong>artist.sonicbase.ink</strong> immediately.
          </p>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
