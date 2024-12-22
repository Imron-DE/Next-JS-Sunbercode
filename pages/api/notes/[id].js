export async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    // Update note berdasarkan ID
    try {
      const response = await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();

      if (result?.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ message: "Failed to update note" });
      }
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ message: "Failed to update note" });
    }
  }

  if (req.method === "DELETE") {
    // Delete note berdasarkan ID
    try {
      const response = await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result?.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ message: "Failed to delete note" });
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ message: "Failed to delete note" });
    }
  }
}

export default handler;
