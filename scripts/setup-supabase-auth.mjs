#!/usr/bin/env node

/**
 * Supabase Auth Setup Script
 * 
 * Run: SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/setup-supabase-auth.mjs
 * 
 * Get Service Role Key from:
 * https://supabase.com/dashboard/project/rwgjngmypmfnmmydlwve/settings/api
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rwgjngmypmfnmmydlwve.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY environment variable.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const users = [
  {
    email: "admin@sonicbase.com",
    password: "sonicbase123",
    user_metadata: { full_name: "Amina Okafor", role: "admin" },
  },
  {
    email: "artist@sonicbase.com",
    password: "sonicbase123",
    user_metadata: { full_name: "Amara Vale", role: "artist" },
  },
];

async function setupAuth() {
  console.log("Setting up Sonicbase Supabase Auth...\n");

  for (const userData of users) {
    console.log(`Creating user: ${userData.email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
      user_metadata: userData.user_metadata,
    });

    if (error) {
      if (error.message.includes("already exists")) {
        console.log(`  User already exists, skipping.`);
      } else {
        console.error(`  Error: ${error.message}`);
      }
    } else {
      console.log(`  Created successfully (ID: ${data.user.id})`);
    }
  }

  console.log("\nAuth setup complete!");
}

setupAuth().catch(console.error);
