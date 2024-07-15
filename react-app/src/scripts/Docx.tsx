import { Document, Packer, Paragraph, TextRun } from "docx";

const createDocument = (
  title: string,
  clauses: { title: string; content: string }[]
) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: title + "\n",
                bold: true,
                size: 32,
                font: "Arial",
              }),
            ],
            alignment: "center",
          }),
          ...clauses.map((clause, index) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${clause.title}\n`,
                  bold: true,
                  font: "Arial",
                }),
                new TextRun({
                  text: "\t" + clause.content,
                  font: "Arial",
                }),
              ],
            });
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title + ".docx";
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export { createDocument };
