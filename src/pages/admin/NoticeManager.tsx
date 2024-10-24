import React, { useState } from 'react';
import { Plus, Bell, Trash2, Edit, Calendar } from 'lucide-react';
import { useNotices } from '../../contexts/NoticeContext';
import { Notice } from '../../types';
import { format } from 'date-fns';

const NoticeManager = () => {
  const { notices, addNotice, updateNotice, deleteNotice } = useNotices();
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'low' as Notice['priority'],
    date: Date.now()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNotice) {
      updateNotice(editingNotice.id, {
        ...formData,
        status: editingNotice.status
      });
      setEditingNotice(null);
    } else {
      addNotice(formData);
    }
    
    setFormData({
      title: '',
      content: '',
      priority: 'low',
      date: Date.now()
    });
    setIsAddingNotice(false);
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      date: notice.date
    });
    setIsAddingNotice(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(id);
    }
  };

  const formatDisplayDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy');
    } catch {
      return format(new Date(), 'MMM dd, yyyy');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400 flex items-center space-x-2">
          <Bell className="w-6 h-6" />
          <span>Notice Manager</span>
        </h1>
        <button
          onClick={() => setIsAddingNotice(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Notice</span>
        </button>
      </div>

      {isAddingNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-xl font-bold text-emerald-400 mb-6">
                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Notice['priority'] })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNotice(false);
                    setEditingNotice(null);
                    setFormData({
                      title: '',
                      content: '',
                      priority: 'low',
                      date: Date.now()
                    });
                  }}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  {editingNotice ? 'Update Notice' : 'Add Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-gray-800 p-4 rounded-lg border ${
              notice.priority === 'high' ? 'border-red-500/50' :
              notice.priority === 'medium' ? 'border-yellow-500/50' :
              'border-blue-500/50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">{notice.title}</h3>
                <p className="text-sm text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDisplayDate(notice.date)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(notice)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mt-2">{notice.content}</p>
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                notice.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                notice.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeManager;