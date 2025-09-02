import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { Calendar, CreditCard, Download, Filter, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal';
// import { type PaymentRecord } from '../../utils/mockData';
/**
 * Payment History Page Component
 * Displays student's payment history with filtering and detailed transaction views
 * Features invoice downloads, payment status tracking, and transaction details
 */
const PaymentHistory: React.FC = () => {
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterAmount, setFilterAmount] = useState<string>('all');
  const navigate = useNavigate();
  const [payments, setPayments] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(() => setPayments([]));
  }, []);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  /**
   * Filter payments based on status and period
   */
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    
    let matchesPeriod = true;
    if (filterPeriod !== 'all') {
      const paymentDate = new Date(payment.date);
      const now = new Date();
      
      switch (filterPeriod) {
        case 'last_month':
          matchesPeriod = paymentDate >= new Date(now.getFullYear(), now.getMonth() - 1, 1);
          break;
        case 'last_3_months':
          matchesPeriod = paymentDate >= new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'last_year':
          matchesPeriod = paymentDate >= new Date(now.getFullYear() - 1, 0, 1);
          break;
      }
    }
    
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    let matchesAmount = true;
    if (filterAmount !== 'all') {
      if (filterAmount === 'lt100') matchesAmount = payment.amount < 100;
      else if (filterAmount === '100to500') matchesAmount = payment.amount >= 100 && payment.amount <= 500;
      else if (filterAmount === 'gt500') matchesAmount = payment.amount > 500;
    }
    return matchesStatus && matchesPeriod && matchesMethod && matchesAmount;
  });

  /**
   * Calculate summary statistics
   */
  const totalPaid = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const pendingAmount = filteredPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  /**
   * Get status icon and styling
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'pending':
        return <Clock size={16} className="text-amber-600" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      failed: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-slate-100 text-slate-700';
  };

  /**
   * Get payment method icon
   */
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard size={16} className="text-blue-600" />;
      case 'bank_transfer':
        return <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">B</span>
        </div>;
      case 'cash':
        return <div className="w-4 h-4 bg-amber-600 rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">$</span>
        </div>;
      default:
        return <CreditCard size={16} className="text-slate-400" />;
    }
  };

  /**
   * Handle payment detail view
   */
  const viewPaymentDetail = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  /**
   * Handle invoice download
   */
  const downloadInvoice = (paymentId: string) => {
    // Simulate invoice download
    alert(`Downloading invoice for payment ${paymentId}...`);
  };

  const exportAllPayments = () => {
    // Simulate CSV export
    const csvRows = [
      ['Transaction', 'Date', 'Amount', 'Method', 'Status'],
      ...filteredPayments.map(p => [p.plan, p.date, p.amount, p.method, p.status])
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Summary statistics
   */
  const summaryStats = [
    {
      title: 'Total Paid',
      value: `$${totalPaid.toFixed(2)}`,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-emerald-500',
      description: 'Successfully completed payments'
    },
    {
      title: 'Pending',
      value: `$${pendingAmount.toFixed(2)}`,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-amber-500',
      description: 'Payments in process'
    },
    {
      title: 'Transactions',
      value: filteredPayments.length,
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Total payment records'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-emerald-100 relative">
      <Navbar />
      {/* Glassmorphism background accent with animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl absolute top-0 left-0 animate-pulse" />
        <div className="w-72 h-72 bg-emerald-300/30 rounded-full blur-2xl absolute bottom-0 right-0 animate-pulse" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-8 lg:px-16 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-xl">Payment History</h1>
          <p className="text-lg md:text-xl text-slate-600 mt-3">Track your subscription payments, download invoices, and manage your transactions with ease.</p>
        </div>

        {/* Summary Statistics */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="flex-1 bg-white/95 border border-slate-100 shadow-xl p-8 rounded-2xl flex items-center gap-6 hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
              <div className={`inline-flex p-4 rounded-xl ${stat.color} text-white shadow-xl"}`}>{stat.icon}</div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-lg md:text-xl font-semibold text-slate-700">{stat.title}</p>
                <p className="text-sm text-slate-500 mt-2">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main Table */}
          <div className="lg:col-span-3 space-y-12">
            {/* Filters - collapsible on mobile */}
            <Card className="mb-10 bg-white/90 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-wrap items-center gap-6">
                  <select
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    className="px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 shadow-sm"
                  >
                    <option value="all">All Methods</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                  </select>
                  <select
                    value={filterAmount}
                    onChange={(e) => setFilterAmount(e.target.value)}
                    className="px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 shadow-sm"
                  >
                    <option value="all">All Amounts</option>
                    <option value="lt100">Less than $100</option>
                    <option value="100to500">$100 - $500</option>
                    <option value="gt500">More than $500</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 shadow-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="px-4 py-3 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 shadow-sm"
                  >
                    <option value="all">All Time</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_3_months">Last 3 Months</option>
                    <option value="last_year">Last Year</option>
                  </select>
                </div>
                <div className="flex gap-4 ml-auto">
                  <Button variant="outline" className="flex items-center gap-2 bg-white/70 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow" onClick={() => {}}>
                    <Filter size={20} />
                    More Filters
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-white/70 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow" onClick={exportAllPayments}>
                    <Download size={20} />
                    Export All
                  </Button>
                </div>
              </div>
            </Card>
            {/* Payment History Table - sticky header, zebra striping, tooltips */}
            <Card className="bg-white/95 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredPayments.map((payment, idx) => (
                      <tr key={payment.id} className={idx % 2 === 0 ? "bg-white hover:bg-indigo-50 transition-colors" : "bg-indigo-50/30 hover:bg-indigo-100 transition-colors"}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-base font-bold text-slate-900">{payment.plan}</div>
                              <div className="text-xs text-slate-500">ID: {payment.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-base text-slate-900">
                            <Calendar size={16} className="mr-2 text-slate-400" />
                            {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-bold text-slate-900">${payment.amount.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-base text-slate-700">
                            {getPaymentMethodIcon(payment.method)}
                            <span className="ml-2 capitalize">{payment.method.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(payment.status)}
                            <span className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}>{payment.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-bold">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => viewPaymentDetail(payment)}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center relative group"
                            >
                              <Eye size={16} className="mr-2" />
                              View
                              <span className="absolute left-0 -top-7 opacity-0 group-hover:opacity-100 transition bg-slate-800 text-white text-xs rounded px-2 py-1 pointer-events-none">View details</span>
                            </button>
                            {payment.status === 'completed' && (
                              <button
                                onClick={() => downloadInvoice(payment.id)}
                                className="text-emerald-600 hover:text-emerald-900 flex items-center relative group"
                              >
                                <Download size={16} className="mr-2" />
                                Invoice
                                <span className="absolute left-0 -top-7 opacity-0 group-hover:opacity-100 transition bg-slate-800 text-white text-xs rounded px-2 py-1 pointer-events-none">Download invoice</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            {/* Empty State */}
            {filteredPayments.length === 0 && (
              <Card className="text-center py-20 bg-white/95 backdrop-blur-lg border border-slate-100 shadow-2xl rounded-2xl mt-10 animate-fade-in">
                <div className="text-slate-400 mb-8">
                  <CreditCard size={64} className="mx-auto animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No payments found</h3>
                <p className="text-slate-500 text-lg">
                  {filterStatus !== 'all' || filterPeriod !== 'all'
                    ? 'Try adjusting your filter criteria.'
                    : 'Your payment history will appear here.'}
                </p>
              </Card>
            )}
            {/* Payment Detail Modal - animated */}
            <Modal
              isOpen={isDetailModalOpen}
              onClose={() => setIsDetailModalOpen(false)}
              title="Payment Details"
              className="animate-fade-in"
            >
              {selectedPayment && (
                <div className="space-y-10">
                  {/* Payment Header */}
                  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-2xl shadow">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900">{selectedPayment.plan}</h4>
                      <p className="text-base text-slate-600">Payment ID: {selectedPayment.id}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-extrabold text-slate-900">${selectedPayment.amount.toFixed(2)}</div>
                      <div className="flex items-center justify-end mt-3">
                        {getStatusIcon(selectedPayment.status)}
                        <span className={`ml-2 px-4 py-2 text-sm font-semibold rounded-full ${getStatusBadge(selectedPayment.status)}`}>{selectedPayment.status}</span>
                      </div>
                    </div>
                  </div>
                  {/* Payment Details */}
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <label className="text-base font-semibold text-slate-600">Payment Date</label>
                      <p className="text-slate-900 text-lg">{new Date(selectedPayment.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-base font-semibold text-slate-600">Payment Method</label>
                      <div className="flex items-center">
                        {getPaymentMethodIcon(selectedPayment.method)}
                        <span className="ml-2 text-slate-900 capitalize text-lg">{selectedPayment.method.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-base font-semibold text-slate-600">Transaction Type</label>
                      <p className="text-slate-900 text-lg">Subscription Payment</p>
                    </div>
                    <div>
                      <label className="text-base font-semibold text-slate-600">Reference</label>
                      <p className="text-slate-900 text-lg">TXN-{selectedPayment.id}-2024</p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-6 pt-8 border-t">
                    {selectedPayment.status === 'completed' && (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => downloadInvoice(selectedPayment.id)}
                        className="flex items-center gap-3 shadow-md"
                      >
                        <Download size={20} />
                        Download Invoice
                      </Button>
                    )}
                    <Button variant="outline" size="md" className="rounded-xl shadow-md">Print Receipt</Button>
                    <Button variant="outline" size="md" className="rounded-xl shadow-md">Email Receipt</Button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
          {/* Sidebar: Quick Actions - sticky, more vibrant */}
          <div className="space-y-12 lg:sticky lg:top-24 h-fit animate-fade-in">
            <Card className="bg-white/95 backdrop-blur-lg border border-slate-100 shadow-2xl p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Quick Actions</h3>
              <div className="space-y-5">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-200 to-indigo-100 hover:from-indigo-300 hover:to-indigo-200 rounded-xl shadow-lg flex items-center gap-4 text-indigo-900 font-semibold text-lg"
                  onClick={() => navigate('/student/dashboard')}
                >
                  View Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-200 to-emerald-100 hover:from-emerald-300 hover:to-emerald-200 rounded-xl shadow-lg flex items-center gap-4 text-emerald-900 font-semibold text-lg"
                  onClick={() => navigate('/student/books')}
                >
                  Browse Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-200 to-amber-100 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-lg flex items-center gap-4 text-amber-900 font-semibold text-lg"
                  onClick={() => navigate('/student/profile')}
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-200 to-blue-100 hover:from-blue-300 hover:to-blue-200 rounded-xl shadow-lg flex items-center gap-4 text-blue-900 font-semibold text-lg"
                  onClick={() => navigate('/support')}
                >
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

}
export default PaymentHistory;