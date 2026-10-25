import { useState } from "react";
import { SECTIONS } from "../../shared/schema.js";
import { api } from "../lib/api";

function SectionEditor({ sectionKey, initialData, onSaved, onUnauthorized }) {
  const section = SECTIONS[sectionKey];
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  function setField(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", text: "" });

    try {
      const { content } = await api.saveSection(sectionKey, data);
      setData(content[sectionKey]);
      onSaved(content);
      setStatus({ type: "success", text: "Saved." });
    } catch (error) {
      if (error.status === 401) {
        onUnauthorized();
        return;
      }
      setStatus({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSave}>
      <h2>{section.label}</h2>

      {section.fields.map((field) => (
        <div className="admin-field" key={field.key}>
          <span>{field.label}</span>
          <FieldInput
            field={field}
            value={data[field.key]}
            onChange={(value) => setField(field.key, value)}
          />
        </div>
      ))}

      <div className="admin-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status.text && <p className={`admin-status-text ${status.type}`}>{status.text}</p>}
      </div>
    </form>
  );
}

function FieldInput({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return <textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;

    case "stringList":
      return (
        <textarea
          rows={Math.max(4, (value ?? []).length + 1)}
          value={(value ?? []).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
        />
      );

    case "list":
      return <ListEditor field={field} items={value ?? []} onChange={onChange} />;

    default:
      return (
        <input
          type={field.type === "email" ? "email" : "text"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function ListEditor({ field, items, onChange }) {
  function updateItem(index, key, value) {
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, Object.fromEntries(field.itemFields.map((f) => [f.key, ""]))]);
  }

  return (
    <div className="admin-list">
      {items.map((item, index) => (
        <div className="admin-list-item" key={index}>
          <div className="admin-list-header">
            <strong>
              {field.label} #{index + 1}
            </strong>
            <button type="button" className="danger" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>

          {field.itemFields.map((subField) => (
            <div className="admin-field" key={subField.key}>
              <span>{subField.label}</span>
              <FieldInput
                field={subField}
                value={item[subField.key]}
                onChange={(value) => updateItem(index, subField.key, value)}
              />
            </div>
          ))}
        </div>
      ))}

      <button type="button" onClick={addItem}>
        + Add item
      </button>
    </div>
  );
}

export default SectionEditor;
