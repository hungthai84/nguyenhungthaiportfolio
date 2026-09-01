import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, Download, Upload, RefreshCw, CheckCircle, Search, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types/ai';
import { faqEngine } from '../../services/faqEngine';

export const AIFaqEditor: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<any>(null);

  // Form State
  const [form, setForm] = useState<Partial<FAQItem>>({
    category: 'GENERAL',
    question: '',
    alternative_questions: [],
    answer: '',
    keywords: [],
    priority: 80,
    voice_enabled: true,
    active: true
  });
  const [altInput, setAltInput] = useState('');
  const [kwInput, setKwInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setFaqs(faqEngine.loadFAQs());
  };

  const handleSave = () => {
    if (!form.question || !form.answer) {
      alert('Vui lòng nhập câu hỏi và câu trả lời!');
      return;
    }

    let updatedList: FAQItem[];
    if (editingId) {
      updatedList = faqs.map(f => (f.id === editingId ? ({ ...f, ...form } as FAQItem) : f));
    } else {
      const newItem: FAQItem = {
        id: 'faq-custom-' + Date.now(),
        category: form.category || 'GENERAL',
        question: form.question || '',
        alternative_questions: form.alternative_questions || [],
        answer: form.answer || '',
        keywords: form.keywords || [],
        priority: form.priority || 80,
        voice_enabled: form.voice_enabled !== false,
        active: form.active !== false
      };
      updatedList = [newItem, ...faqs];
    }

    faqEngine.saveFAQs(updatedList);
    setFaqs(updatedList);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi FAQ này?')) {
      const updated = faqs.filter(f => f.id !== id);
      faqEngine.saveFAQs(updated);
      setFaqs(updated);
    }
  };

  const handleEdit = (item: FAQItem) => {
    setEditingId(item.id);
    setForm(item);
    setAltInput(item.alternative_questions.join('\n'));
    setKwInput(item.keywords.join(', '));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      category: 'GENERAL',
      question: '',
      alternative_questions: [],
      answer: '',
      keywords: [],
      priority: 80,
      voice_enabled: true,
      active: true
    });
    setAltInput('');
    setKwInput('');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(faqs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-faq-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target?.result as string);
          if (Array.isArray(imported)) {
            faqEngine.saveFAQs(imported);
            setFaqs(imported);
            alert('Nhập dữ liệu FAQ thành công!');
          }
        } catch (err) {
          alert('File JSON không hợp lệ!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTest = () => {
    if (!testQuery) return;
    const res = faqEngine.searchFAQ(testQuery);
    setTestResult(res);
  };

  const filteredFaqs = faqs.filter(
    f =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100 text-sm">
      {/* Header & Export/Import Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span>Quản lý FAQ Câu Hỏi Cấu Hình Sẵn ({faqs.length})</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Thêm, sửa, xóa câu hỏi giúp AI trả lời ngay mà không cần gọi API.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" /> Xuất FAQ
          </button>
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Nhập FAQ
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={() => {
              if (confirm('Khôi phục danh sách FAQ mặc định?')) {
                faqEngine.resetFAQs();
                loadData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Test Query Sandbox */}
      <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800/50">
        <h4 className="text-xs font-bold text-purple-900 dark:text-purple-300 mb-2">TEST KIỂM TRA ĐỘ CHÍNH XÁC FAQ:</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập câu hỏi thử nghiệm (Ví dụ: Anh Thái có bao nhiêu năm kinh nghiệm?)..."
            value={testQuery}
            onChange={e => setTestQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl glass-surface border border-purple-200 dark:border-purple-700 text-xs"
          />
          <button onClick={handleTest} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold">
            Kiểm tra
          </button>
        </div>
        {testResult && (
          <div className="mt-3 p-3 glass-surface rounded-xl border border-purple-200 dark:border-purple-800 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">Kết quả khớp:</span>
              <span className="font-semibold text-emerald-600">{testResult.faq ? 'Khớp thành công' : 'Không tìm thấy'}</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">Độ tin cậy: {(testResult.confidence * 100).toFixed(0)}%</span>
            </div>
            {testResult.faq && (
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Câu trả lời:</strong> {testResult.faq.answer}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Editor Form */}
      <div className="p-4 glass-surface rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-indigo-600 dark:text-indigo-400">
          {editingId ? 'Chỉnh sửa Câu Hỏi FAQ' : 'Thêm Câu Hỏi FAQ Mới'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold block mb-1">Danh mục (Category)</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            >
              <option value="PROFILE">PROFILE (Hồ sơ chung)</option>
              <option value="EXPERIENCE">EXPERIENCE (Kinh nghiệm)</option>
              <option value="SKILL">SKILL (Kỹ năng)</option>
              <option value="PROJECT">PROJECT (Dự án)</option>
              <option value="MANAGEMENT">MANAGEMENT (Quản lý)</option>
              <option value="CUSTOMER_SERVICE">CUSTOMER_SERVICE (CSKH / Call Center)</option>
              <option value="CONTACT">CONTACT (Liên hệ)</option>
              <option value="GENERAL">GENERAL (Chung)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1">Độ ưu tiên (Priority 1-100)</label>
            <input
              type="number"
              value={form.priority}
              onChange={e => setForm({ ...form, priority: parseInt(e.target.value) || 80 })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Câu hỏi chính (Question)</label>
          <input
            type="text"
            placeholder="Ví dụ: Anh Thái có bao nhiêu năm kinh nghiệm?"
            value={form.question}
            onChange={e => setForm({ ...form, question: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Các câu hỏi tương tự (Mỗi câu một dòng)</label>
          <textarea
            rows={2}
            placeholder="Kinh nghiệm của anh Thái\nSố năm làm việc..."
            value={altInput}
            onChange={e => {
              setAltInput(e.target.value);
              setForm({
                ...form,
                alternative_questions: e.target.value
                  .split('\n')
                  .map(s => s.trim())
                  .filter(Boolean)
              });
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Câu trả lời (Answer)</label>
          <textarea
            rows={3}
            placeholder="Nhập câu trả lời chính xác..."
            value={form.answer}
            onChange={e => setForm({ ...form, answer: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Từ khóa khớp (Keywords phân cách bằng dấu phẩy)</label>
          <input
            type="text"
            placeholder="kinh nghiem, bao nhieu nam, tham nien"
            value={kwInput}
            onChange={e => {
              setKwInput(e.target.value);
              setForm({
                ...form,
                keywords: e.target.value
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
              });
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
          >
            <Save className="w-4 h-4" /> {editingId ? 'Cập nhật FAQ' : 'Lưu FAQ Mới'}
          </button>
          {editingId && (
            <button onClick={resetForm} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs">
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* List of Existing FAQs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm trong danh sách FAQ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
          />
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filteredFaqs.map(item => (
            <div
              key={item.id}
              className="p-3 glass-surface/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold text-[10px]">
                    {item.category}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.question}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{item.answer}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-600"
                  title="Sửa FAQ"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-red-500"
                  title="Xóa FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
