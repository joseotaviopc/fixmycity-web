import { useState } from "react";
import { generateUUID } from "../utils/uuid";
import { categories, category, Issue as IssueType } from "../db/schema";
import { CreateIssue, UploadIssueImage } from "../services/supabase";
import { ImagePicker } from "../components/image-picker";

const initialForm: IssueType = {
  category: category.Values.pothole,
  id: generateUUID(),
  title: "",
  location: "",
  priority: "low",
  reportedAt: new Date(),
  reportedBy: "",
  status: "pending",
  synced: false,
  description: "",
  resolutionNotes: "",
  resolvedAt: undefined,
  resolvedBy: "",
};

export function Issue() {
  const [issueImage, setIssueImage] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [selectedIndex, setSelectedIndex] = useState({
    category: 0,
    priority: 0,
  });

  const [form, setForm] = useState<IssueType>(initialForm);

  async function handleSubmitForm() {
    if (!form.title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }
    if (!form.description) {
      setErrors({ ...errors, description: "Description is required" });
      return;
    }
    if (!form.category) {
      setErrors({ ...errors, category: "Category is required" });
      return;
    }

    let imageUrl = null;

    try {
      setLoadingData(true);
      if (issueImage) {
        imageUrl = await UploadIssueImage(issueImage);
      }

      const createIssuedata = {
        title: form.title,
        description: form.description,
        category: form.category,
        image: imageUrl,
      };

      console.log("createIssuedata", createIssuedata);
      const resultCreated = await CreateIssue(createIssuedata);
      console.log("resultCreated", resultCreated);
      setForm(initialForm);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingData(false);
    }
    // setIssues((prev) => [...(prev ?? []), form]);
    setShowForm(false);
  }

  return (
    <div className="px-4 py-8">
      <h1>Create issues</h1>
      <div className="flex flex-col gap-3 my-6 px-4 w-full">
        <input
          placeholder="Title"
          type="text"
          className="border border-gray-300 rounded-lg p-2 h-12 text-gray-600"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm({ ...form, title });
            if (title.length < 1) setErrors({ ...errors, title: "Title is required" });
            if (title.length > 0) setErrors({ ...errors, title: "" });
          }}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <textarea
          placeholder="Description"
          className="border border-gray-300 rounded-lg p-2 h-24 align-text-top text-gray-600"
          value={form.description}
          onChange={(e) => {
            const description = e.target.value;
            setForm({ ...form, description });
            if (description.length < 1) setErrors({ ...errors, description: "Description is required" });
            if (description.length > 0) setErrors({ ...errors, description: "" });
          }}
        />
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        <button
          className="border border-gray-300 rounded-lg p-2 h-12 text-gray-600 justify-center"
          onClick={() => null}>
          <p style={{ color: "#999" }}>{form.category}</p>
        </button>
        {openCategoryOptions &&
          categories
            ?.filter((category) => category.label === form.category)[0]
            ?.options?.map((option) => (
              <button
                key={option}
                className="ml-5 justify-center"
                onClick={() => {
                  setForm({ ...form, subCategory: option });
                  setOpenCategoryOptions(false);
                }}>
                <p style={{ color: "#999" }}>- {option}</p>
              </button>
            ))}
        <button
          className="border border-gray-300 rounded-lg p-2 h-12 text-gray-600 justify-center"
          onClick={() => null}>
          <p style={{ color: "#999" }}>{form.priority}</p>
        </button>
        {/* <p>{JSON.stringify(form, null, 4)}</p> */}
      </div>
      <div style={{ flex: 1 }}>
        <ImagePicker
        // setIssueImage={setIssueImage} issueImage={issueImage} 
        />
      </div>
      <button
        onClick={handleSubmitForm}
        disabled={loadingData}
        style={{ backgroundColor: "#165c0f", padding: 12, borderRadius: 16, marginBottom: 32 }}>
        {loadingData ?
          <div className="animate-spin border-4 border-t-4 border-t-white border-gray-300 rounded-full h-4 w-4" />
          : <p style={{ color: "#FFF", fontSize: 22, textAlign: "center" }}>Create</p>}
        {/* <Button title="Hide" onPress={() => setShowForm(false)} /> */}
      </button>
    </div>
  );
};
