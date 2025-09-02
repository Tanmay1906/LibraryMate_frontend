import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { Bell, Send, Users, Mail, MessageCircle, Calendar, Trash2 } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
/**
 * Notifications Page Component
 * Manages payment reminders and communication with students
 * Features email and WhatsApp notification scheduling
 */
const Notifications: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    type: 'email' as 'email' | 'whatsapp',
    recipients: 'all' as 'all' | 'pending' | 'overdue',
    subject: '',
    message: '',
    scheduleDate: ''
  });
  // Notification history from backend
  const [notificationHistory, setNotificationHistory] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/notifications')
      .then(res => res.json())
      .then(data => setNotificationHistory(data))
      .catch(() => setNotificationHistory([]));
  }, []);

  // Notification templates from backend
  const [templates, setTemplates] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/notification-templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(() => setTemplates([]));
  }, []);

  /**
   * Handle form input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNotificationForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handle template selection
   */
  const useTemplate = (template: typeof templates[0]) => {
    setNotificationForm(prev => ({
      ...prev,
      type: template.type as 'email' | 'whatsapp',
      subject: template.subject,
      message: template.message
    }));
  };

  /**
   * Send notification
   */
  const handleSendNotification = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCreateModalOpen(false);
    setNotificationForm({
      type: 'email',
      recipients: 'all',
      subject: '',
      message: '',
      scheduleDate: ''
    });
  };

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status: string) => {
    const styles = {
      sent: 'bg-emerald-100 text-emerald-700',
      scheduled: 'bg-blue-100 text-blue-700',
      failed: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-700';
  };

  /**
   * Get type icon
   */
  const getTypeIcon = (type: string) => {
    return type === 'email' ? <Mail size={16} /> : <MessageCircle size={16} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />
      {/* Glassmorphism background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl absolute top-0 left-0" />
        <div className="w-72 h-72 bg-emerald-200/30 rounded-full blur-2xl absolute bottom-0 right-0" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">Notifications</h1>
          <p className="text-lg text-slate-600 mt-3">Send payment reminders and communicate with students.</p>
        </div>

        {/* Main Layout: Sidebar (Quick Actions & Stats) + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar: Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-10">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow flex items-center gap-3 text-indigo-900 font-semibold"
                  onClick={() => {
                    setNotificationForm(prev => ({ ...prev, recipients: 'pending' }));
                    setIsCreateModalOpen(true);
                  }}
                >
                  <Bell size={18} className="text-indigo-600" /> Payment Reminders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => {
                    setNotificationForm(prev => ({ ...prev, recipients: 'all' }));
                    setIsCreateModalOpen(true);
                  }}
                >
                  <Mail size={18} className="text-emerald-600" /> Broadcast Message
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow flex items-center gap-3 text-amber-900 font-semibold"
                  onClick={() => {
                    setNotificationForm(prev => ({ ...prev, recipients: 'overdue' }));
                    setIsCreateModalOpen(true);
                  }}
                >
                  <Users size={18} className="text-amber-600" /> Overdue Notices
                </Button>
              </div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Sent This Month</span>
                  <span className="font-semibold text-slate-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Open Rate</span>
                  <span className="font-semibold text-emerald-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Response Rate</span>
                  <span className="font-semibold text-blue-600">45%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content: Notification History & Templates */}
          <div className="lg:col-span-3 space-y-12">
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Recent Notifications</h3>
                <Button variant="outline" size="sm" className="bg-white/60 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow">View All</Button>
              </div>
              <div className="space-y-5">
                {notificationHistory.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 via-white to-indigo-50 rounded-xl shadow-sm hover:scale-[1.01] transition-transform">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        notification.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      } shadow`}>{getTypeIcon(notification.type)}</div>
                      <div>
                        <p className="font-semibold text-slate-900 text-lg">{notification.subject}</p>
                        <p className="text-sm text-slate-500">
                          Sent to {notification.recipients} recipients on {new Date(notification.sentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(notification.status)} shadow`}>{notification.status}</span>
                      <Button variant="outline" size="sm" className="bg-white/60 border border-slate-200 hover:bg-red-50 transition-colors shadow">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Message Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {templates.map((template) => (
                  <div key={template.id} className="p-5 border border-slate-200 rounded-xl bg-white/70 hover:border-indigo-300 transition-colors shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-900 text-lg">{template.name}</h4>
                      <div className={`p-2 rounded ${
                        template.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      } shadow`}>{getTypeIcon(template.type)}</div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{template.subject}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => useTemplate(template)}
                      className="w-full bg-white/60 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow"
                    >
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Create Notification Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Notification"
          size="lg"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleSendNotification(); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Notification Type</label>
                <select
                  name="type"
                  value={notificationForm.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 backdrop-blur-lg"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Recipients</label>
                <select
                  name="recipients"
                  value={notificationForm.recipients}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 backdrop-blur-lg"
                >
                  <option value="all">All Students</option>
                  <option value="pending">Pending Payments</option>
                  <option value="overdue">Overdue Payments</option>
                </select>
              </div>
            </div>
            <Input
              name="subject"
              label="Subject"
              placeholder="Enter notification subject"
              value={notificationForm.subject}
              onChange={handleInputChange}
              required
              className="bg-white/60 border border-indigo-200 rounded-lg"
            />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                name="message"
                rows={6}
                placeholder="Enter your message..."
                value={notificationForm.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 backdrop-blur-lg"
                required
              />
            </div>
            <Input
              name="scheduleDate"
              type="datetime-local"
              label="Schedule Date (Optional)"
              value={notificationForm.scheduleDate}
              onChange={handleInputChange}
              leftIcon={<Calendar size={18} />}
              helperText="Leave empty to send immediately"
              className="bg-white/60 border border-indigo-200 rounded-lg"
            />
            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" className="flex items-center gap-2 shadow bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform">
                <Send size={16} />
                {notificationForm.scheduleDate ? 'Schedule' : 'Send Now'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-white/60 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Notifications;