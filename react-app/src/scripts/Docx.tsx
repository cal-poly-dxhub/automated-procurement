import { Document, Packer, Paragraph, TextRun } from "docx";

const createDocument = (
  filepath: string,
  clauses: { title: string; content: string }[]
) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: clauses.map((clause) => {
          return new Paragraph({
            children: [
              new TextRun({
                text: clause.title,
                bold: true,
              }),
              new TextRun({
                text: clause.content,
              }),
            ],
          });
        }),
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filepath;
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export { createDocument };
