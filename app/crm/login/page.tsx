import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed, getCrmConfig } from "@/lib/crmAuth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "CRM · Login", robots: { index: false, follow: false } };

export default async function CrmLoginPage() {
  if (await isAuthed()) redirect("/crm");
  const { configured } = getCrmConfig();
  return <LoginForm configured={configured} />;
}
