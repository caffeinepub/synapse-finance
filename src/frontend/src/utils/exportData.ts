import type { Transaction } from "../data/transactions";

export function exportToCSV(
  transactions: Transaction[],
  filename: string,
): void {
  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount.toString(),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function exportToJSON(
  transactions: Transaction[],
  filename: string,
): void {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, `${filename}.json`, "application/json");
}

function downloadFile(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
