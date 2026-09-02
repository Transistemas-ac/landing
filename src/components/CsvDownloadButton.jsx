import Button from "./Button";
import { downloadCsv } from "../utils/csv";

function CsvDownloadButton({ items, filename, children, className = "" }) {
  return (
    <Button
      type="button"
      className={className}
      onClick={() => downloadCsv(items, filename)}
    >
      {children}
    </Button>
  );
}

export default CsvDownloadButton;