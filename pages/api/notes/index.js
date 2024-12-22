export async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch data dari API eksternal
    try {
      const response = await fetch("https://service.pace-unv.cloud/api/notes");
      const notes = await response.json();
      return res.status(200).json(notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      return res.status(500).json({ message: "Error fetching notes" });
    }
  }

  if (req.method === "POST") {
    // Proses untuk membuat catatan baru
    try {
      const response = await fetch("https://service.pace-unv.cloud/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();

      if (result?.success) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json({ message: "Failed to create note" });
      }
    } catch (error) {
      console.error("Error creating note:", error);
      return res.status(500).json({ message: "Failed to create note" });
    }
  }
}

export default handler;
