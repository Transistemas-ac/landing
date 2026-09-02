const CSV_HEADERS = [
  "nombre",
  "especialidad",
  "provincia",
  "ciudad",
  "direccion",
  "telefono",
  "correo",
  "lat",
  "lng"
];

const csvField = (value) => {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

const buildCsv = (items) => {
  const rows = items.map((item) =>
    CSV_HEADERS.map((header) => csvField(item[header])).join(";")
  );
  return `\uFEFF${CSV_HEADERS.join(";")}\n${rows.join("\n")}`;
};

const downloadCsv = (items, filename) => {
  const blob = new Blob([buildCsv(items)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export { buildCsv, downloadCsv };