'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  X,
  Eye,
  Trash2,
  Edit2,
  Bell,
  Menu,
} from 'lucide-react';
import './styles.css';

const LeadManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);

  const [payments, setPayments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedMeetings, setSelectedMeetings] = useState([]);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    source: 'Referral',
    status: 'New',
    priority: 'Medium',
    value: '',
    workedBy: 'Not selected',
    lockedBy: 'Not selected',
    requirement: '',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [paymentFormData, setPaymentFormData] = useState({
    client: '',
    amount: '',
    date: '',
    method: 'Bank Transfer',
    workedBy: 'Not selected',
    lockedBy: 'Not selected',
    status: 'Completed',
    reference: '',
  });

  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [meetingFormData, setMeetingFormData] = useState({
    name: '',
    dateTime: '',
    contactNumber: '',
    participants: '',
    status: 'Scheduled',
  });

  const teamMembers = ['Rishabh', 'Anas', 'Prashil', 'Rohit', 'Harsh', 'Ganesh'];

  useEffect(() => {
    fetchLeads();
    fetchPayments();
    fetchMeetings();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        const errData = await res.json();
        console.error('API Error (Leads):', errData);
      }
    } catch (error) {
      console.error('Network Error fetching leads:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/payments');
      if (res.ok) {
        const data = await res.json();
        setPayments(data);
      } else {
        const errData = await res.json();
        console.error('API Error (Payments):', errData);
      }
    } catch (error) {
      console.error('Network Error fetching payments:', error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await fetch('/api/meetings');
      if (res.ok) {
        const data = await res.json();
        setMeetings(data);
      } else {
        const errData = await res.json();
        console.error('API Error (Meetings):', errData);
      }
    } catch (error) {
      console.error('Network Error fetching meetings:', error);
    }
  };

  const handleAddLead = () => {
    setEditingLead(null);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      source: 'Referral',
      status: 'New',
      priority: 'Medium',
      value: '',
      workedBy: 'Not selected',
      lockedBy: 'Not selected',
      requirement: '',
    });
    setShowLeadModal(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setFormData(lead);
    setShowLeadModal(true);
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (editingLead) {
      try {
        const res = await fetch(`/api/leads/${editingLead._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updatedLead = await res.json();
          setLeads(leads.map((l) => (l._id === editingLead._id ? updatedLead : l)));
        }
      } catch (error) {
        console.error('Error updating lead:', error);
      }
    } else {
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const newLead = await res.json();
          setLeads([newLead, ...leads]);
        }
      } catch (error) {
        console.error('Error creating lead:', error);
      }
    }
    setShowLeadModal(false);
  };

  const handleDeleteLead = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLeads(leads.filter((l) => l._id !== id));
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleAddPayment = () => {
    setEditingPayment(null);
    setPaymentFormData({
      client: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: 'Bank Transfer',
      workedBy: 'Not selected',
      lockedBy: 'Not selected',
      status: 'Completed',
      reference: '',
    });
    setShowPaymentModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setPaymentFormData({
      ...payment,
      date: payment.date ? new Date(payment.date).toISOString().split('T')[0] : '',
    });
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (editingPayment) {
      try {
        const res = await fetch(`/api/payments/${editingPayment._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentFormData),
        });
        if (res.ok) {
          const updatedPayment = await res.json();
          setPayments(payments.map((p) => (p._id === editingPayment._id ? updatedPayment : p)));
        }
      } catch (error) {
        console.error('Error updating payment:', error);
      }
    } else {
      try {
        const res = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentFormData),
        });
        if (res.ok) {
          const newPayment = await res.json();
          setPayments([newPayment, ...payments]);
        }
      } catch (error) {
        console.error('Error creating payment:', error);
      }
    }
    setShowPaymentModal(false);
  };

  const handleDeletePayment = async (id) => {
    if (!confirm('Are you sure you want to delete this payment?')) return;
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPayments(payments.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleAddMeeting = () => {
    setEditingMeeting(null);
    setMeetingFormData({
      name: '',
      dateTime: '',
      contactNumber: '',
      participants: '',
      status: 'Scheduled',
    });
    setShowMeetingModal(true);
  };

  const handleEditMeeting = (meeting) => {
    setEditingMeeting(meeting);
    setMeetingFormData({
      ...meeting,
      dateTime: meeting.dateTime ? new Date(meeting.dateTime).toISOString().slice(0, 16) : '',
    });
    setShowMeetingModal(true);
  };

  const handleSubmitMeeting = async (e) => {
    e.preventDefault();
    if (editingMeeting) {
      try {
        const res = await fetch(`/api/meetings/${editingMeeting._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(meetingFormData),
        });
        if (res.ok) {
          const updatedMeeting = await res.json();
          setMeetings(meetings.map((m) => (m._id === editingMeeting._id ? updatedMeeting : m)));
        }
      } catch (error) {
        console.error('Error updating meeting:', error);
      }
    } else {
      try {
        const res = await fetch('/api/meetings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(meetingFormData),
        });
        if (res.ok) {
          const newMeeting = await res.json();
          setMeetings([newMeeting, ...meetings]);
        }
      } catch (error) {
        console.error('Error creating meeting:', error);
      }
    }
    setShowMeetingModal(false);
  };

  const handleDeleteMeeting = async (id) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMeetings(meetings.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const handleSelectLead = (id) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]);
  };
  const handleSelectAllLeads = (e) => {
    if (e.target.checked) setSelectedLeads(leads.map(l => l._id));
    else setSelectedLeads([]);
  };
  const handleBulkDeleteLeads = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedLeads.length} leads?`)) return;
    try {
      await Promise.all(selectedLeads.map(id => fetch(`/api/leads/${id}`, { method: 'DELETE' })));
      setLeads(leads.filter(l => !selectedLeads.includes(l._id)));
      setSelectedLeads([]);
    } catch (error) {
      console.error('Error bulk deleting leads:', error);
    }
  };

  const handleSelectPayment = (id) => {
    setSelectedPayments(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
  };
  const handleSelectAllPayments = (e) => {
    if (e.target.checked) setSelectedPayments(payments.map(p => p._id));
    else setSelectedPayments([]);
  };
  const handleBulkDeletePayments = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedPayments.length} payments?`)) return;
    try {
      await Promise.all(selectedPayments.map(id => fetch(`/api/payments/${id}`, { method: 'DELETE' })));
      setPayments(payments.filter(p => !selectedPayments.includes(p._id)));
      setSelectedPayments([]);
    } catch (error) {
      console.error('Error bulk deleting payments:', error);
    }
  };

  const handleSelectMeeting = (id) => {
    setSelectedMeetings(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };
  const handleSelectAllMeetings = (e) => {
    if (e.target.checked) setSelectedMeetings(meetings.map(m => m._id));
    else setSelectedMeetings([]);
  };
  const handleBulkDeleteMeetings = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedMeetings.length} meetings?`)) return;
    try {
      await Promise.all(selectedMeetings.map(id => fetch(`/api/meetings/${id}`, { method: 'DELETE' })));
      setMeetings(meetings.filter(m => !selectedMeetings.includes(m._id)));
      setSelectedMeetings([]);
    } catch (error) {
      console.error('Error bulk deleting meetings:', error);
    }
  };

  const stats = {
    totalLeads: leads.length,
    newThisWeek: leads.filter((l) => l.status === 'New').length,
    won: leads.filter((l) => l.status === 'Won').length,
    lost: leads.filter((l) => l.status === 'Lost').length,
    collected: payments.reduce((sum, p) => sum + p.amount, 0),
    pending: leads.reduce((sum, l) => sum + l.value, 0),
  };

  const statusCounts = {
    New: leads.filter((l) => l.status === 'New').length,
    Contacted: leads.filter((l) => l.status === 'Contacted').length,
    Qualified: leads.filter((l) => l.status === 'Qualified').length,
    Proposal: leads.filter((l) => l.status === 'Proposal sent').length,
    Won: leads.filter((l) => l.status === 'Won').length,
    Lost: leads.filter((l) => l.status === 'Lost').length,
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">📊</div>
            <h1>Lead Manager</h1>
          </div>
          <div className="header-actions">
            <button className="search-btn">
              <Search size={20} />
              <input type="text" placeholder="Search..." />
            </button>
            {activeTab === 'payments' ? (
              <button className="add-lead-btn" onClick={handleAddPayment}>
                <Plus size={20} />
                Add Payment
              </button>
            ) : activeTab === 'meetings' ? (
              <button className="add-lead-btn" onClick={handleAddMeeting}>
                <Plus size={20} />
                Add Meeting
              </button>
            ) : (
              <button className="add-lead-btn" onClick={handleAddLead}>
                <Plus size={20} />
                Add Lead
              </button>
            )}
            <button className="notification-btn">
              <Bell size={20} />
            </button>
            <button className="menu-btn">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={20} />
            Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <Users size={20} />
            Leads
          </button>
          <button
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <DollarSign size={20} />
            Payments
          </button>
          <button
            className={`nav-item ${activeTab === 'meetings' ? 'active' : ''}`}
            onClick={() => setActiveTab('meetings')}
          >
            <Calendar size={20} />
            Meetings
          </button>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Total Leads</h3>
                    <Users className="stat-icon" />
                  </div>
                  <p className="stat-value">{stats.totalLeads}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>New This Week</h3>
                    <TrendingUp className="stat-icon" />
                  </div>
                  <p className="stat-value">{stats.newThisWeek}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Won</h3>
                    <TrendingUp className="stat-icon win" />
                  </div>
                  <p className="stat-value">{stats.won}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Lost</h3>
                    <TrendingUp className="stat-icon lose" />
                  </div>
                  <p className="stat-value">{stats.lost}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Collected</h3>
                    <DollarSign className="stat-icon" />
                  </div>
                  <p className="stat-value">₹{stats.collected.toLocaleString()}</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <h3>Pending</h3>
                    <DollarSign className="stat-icon pending" />
                  </div>
                  <p className="stat-value">₹{stats.pending.toLocaleString()}</p>
                </div>
              </div>

              {/* Leads by Status */}
              <div className="chart-section">
                <h2>Leads by Status</h2>
                <div className="status-chart">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="status-bar">
                      <label>{status}</label>
                      <div className="bar-container">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${Math.max((count / Math.max(...Object.values(statusCounts), 1)) * 100, 5)}%`,
                          }}
                        />
                      </div>
                      <span className="bar-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Leads */}
              <div className="recent-section">
                <div className="section-header">
                  <h2>Recent Leads</h2>
                  <a href="#" className="view-all">
                    View all
                  </a>
                </div>
                <div className="recent-list">
                  {leads.slice(0, 3).map((lead) => (
                    <div key={lead._id} className="recent-item">
                      <div className="recent-info">
                        <h4>{lead.name}</h4>
                        <p>{lead.company}</p>
                      </div>
                      <span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <div className="empty-state">
                      <p>No leads yet. Create your first lead to get started.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="recent-section">
                <div className="section-header">
                  <h2>Recent Payments</h2>
                  <a href="#" className="view-all">
                    View all
                  </a>
                </div>
                {payments.length === 0 ? (
                  <div className="empty-state">
                    <p>No payments yet.</p>
                  </div>
                ) : (
                  <div className="recent-list">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment._id} className="recent-item">
                        <div className="recent-info">
                          <h4>{payment.client}</h4>
                          <p>₹{payment.amount.toLocaleString()}</p>
                        </div>
                        <span className="payment-date">{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="leads-section">
              <div className="section-toolbar">
                <h2>All Leads</h2>
                <div className="toolbar-actions">
                  {selectedLeads.length > 0 && (
                    <button className="action-btn delete" onClick={handleBulkDeleteLeads} style={{ display: 'flex', gap: '0.5rem', background: '#fee2e2', borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1rem' }}>
                      <Trash2 size={16} /> Delete Selected ({selectedLeads.length})
                    </button>
                  )}
                  <button className="filter-btn">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th className="checkbox-cell" style={{ width: '40px' }}>
                        <input type="checkbox" onChange={handleSelectAllLeads} checked={leads.length > 0 && selectedLeads.length === leads.length} />
                      </th>
                      <th>Name / Company</th>
                      <th>Contact</th>
                      <th>Requirement</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Value</th>
                      <th>Worked By</th>
                      <th>Locked By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead._id} className={selectedLeads.includes(lead._id) ? 'selected-row' : ''}>
                        <td className="checkbox-cell" data-label="Select">
                          <input type="checkbox" checked={selectedLeads.includes(lead._id)} onChange={() => handleSelectLead(lead._id)} />
                        </td>
                        <td data-label="Name / Company">
                          <div className="name-cell">
                            <strong>{lead.name}</strong>
                            <span>{lead.company}</span>
                          </div>
                        </td>
                        <td data-label="Contact">
                          <div className="contact-cell">
                            <p>{lead.phone}</p>
                            <p>{lead.email}</p>
                          </div>
                        </td>
                        <td data-label="Requirement">{lead.requirement || '—'}</td>
                        <td data-label="Status">
                          <span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
                        </td>
                        <td data-label="Priority">
                          <span className={`priority-badge ${lead.priority.toLowerCase()}`}>{lead.priority}</span>
                        </td>
                        <td data-label="Value">₹{lead.value.toLocaleString()}</td>
                        <td data-label="Worked By">{lead.workedBy}</td>
                        <td data-label="Locked By">{lead.lockedBy || '—'}</td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="action-btn edit"
                              onClick={() => handleEditLead(lead)}
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteLead(lead._id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leads.length === 0 && (
                  <div className="empty-table">
                    <p>No leads found. Add your first lead to get started.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="payments-section">
              <div className="section-toolbar">
                <h2>Payments</h2>
                <div className="toolbar-actions">
                  {selectedPayments.length > 0 && (
                    <button className="action-btn delete" onClick={handleBulkDeletePayments} style={{ display: 'flex', gap: '0.5rem', background: '#fee2e2', borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1rem' }}>
                      <Trash2 size={16} /> Delete Selected ({selectedPayments.length})
                    </button>
                  )}
                  <button className="filter-btn">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="payments-table">
                  <thead>
                    <tr>
                      <th className="checkbox-cell" style={{ width: '40px' }}>
                        <input type="checkbox" onChange={handleSelectAllPayments} checked={payments.length > 0 && selectedPayments.length === payments.length} />
                      </th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Worked By</th>
                      <th>Locked By</th>
                      <th>Status</th>
                      <th>Reference</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan="9" className="empty-cell">
                          <p>No payments recorded yet.</p>
                        </td>
                      </tr>
                    )}
                    {payments.map((payment) => (
                      <tr key={payment._id} className={selectedPayments.includes(payment._id) ? 'selected-row' : ''}>
                        <td className="checkbox-cell" data-label="Select">
                          <input type="checkbox" checked={selectedPayments.includes(payment._id)} onChange={() => handleSelectPayment(payment._id)} />
                        </td>
                        <td data-label="Client">{payment.client}</td>
                        <td data-label="Amount">₹{payment.amount.toLocaleString()}</td>
                        <td data-label="Date">{new Date(payment.date).toLocaleDateString()}</td>
                        <td data-label="Method">{payment.method}</td>
                        <td data-label="Worked By">{payment.workedBy}</td>
                        <td data-label="Locked By">{payment.lockedBy || '—'}</td>
                        <td data-label="Status">
                          <span className={`status-badge ${payment.status.toLowerCase()}`}>{payment.status}</span>
                        </td>
                        <td data-label="Reference">{payment.reference || '—'}</td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="action-btn edit"
                              onClick={() => handleEditPayment(payment)}
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeletePayment(payment._id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Meetings Tab */}
          {activeTab === 'meetings' && (
            <div className="meetings-section">
              <div className="section-toolbar">
                <h2>Meetings</h2>
                <div className="toolbar-actions">
                  {selectedMeetings.length > 0 && (
                    <button className="action-btn delete" onClick={handleBulkDeleteMeetings} style={{ display: 'flex', gap: '0.5rem', background: '#fee2e2', borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1rem' }}>
                      <Trash2 size={16} /> Delete Selected ({selectedMeetings.length})
                    </button>
                  )}
                  <button className="filter-btn">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table className="meetings-table">
                  <thead>
                    <tr>
                      <th className="checkbox-cell" style={{ width: '40px' }}>
                        <input type="checkbox" onChange={handleSelectAllMeetings} checked={meetings.length > 0 && selectedMeetings.length === meetings.length} />
                      </th>
                      <th>Meeting Name</th>
                      <th>Date & Time</th>
                      <th>Contact Number</th>
                      <th>Participants</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.length === 0 && (
                      <tr>
                        <td colSpan="6" className="empty-cell">
                          <p>No meetings scheduled yet.</p>
                        </td>
                      </tr>
                    )}
                    {meetings.map((meeting) => (
                      <tr key={meeting._id} className={selectedMeetings.includes(meeting._id) ? 'selected-row' : ''}>
                        <td className="checkbox-cell" data-label="Select">
                          <input type="checkbox" checked={selectedMeetings.includes(meeting._id)} onChange={() => handleSelectMeeting(meeting._id)} />
                        </td>
                        <td data-label="Meeting Name">{meeting.name}</td>
                        <td data-label="Date & Time">{new Date(meeting.dateTime).toLocaleString()}</td>
                        <td data-label="Contact Number">{meeting.contactNumber || '—'}</td>
                        <td data-label="Participants">{meeting.participants || '—'}</td>
                        <td data-label="Status">
                          <span className={`status-badge ${meeting.status.toLowerCase().replace(' ', '-')}`}>{meeting.status}</span>
                        </td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="action-btn edit"
                              onClick={() => handleEditMeeting(meeting)}
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDeleteMeeting(meeting._id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="modal-overlay" onClick={() => setShowLeadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingLead ? 'Edit Lead' : 'New Lead'}</h2>
              <button className="close-btn" onClick={() => setShowLeadModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitLead} className="lead-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lead name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="source">Source</label>
                  <select
                    id="source"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  >
                    <option>Referral</option>
                    <option>Website</option>
                    <option>Ad</option>
                    <option>Cold call</option>
                    <option>Social</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Proposal sent</option>
                    <option>Won</option>
                    <option>Lost</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="value">Estimated value (₹)</label>
                  <input
                    type="number"
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workedBy">Assigned to (worked by)</label>
                  <select
                    id="workedBy"
                    value={formData.workedBy}
                    onChange={(e) => setFormData({ ...formData, workedBy: e.target.value })}
                  >
                    <option>Not selected</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lockedBy">Locked by (owner)</label>
                  <select
                    id="lockedBy"
                    value={formData.lockedBy}
                    onChange={(e) => setFormData({ ...formData, lockedBy: e.target.value })}
                  >
                    <option>Not selected</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="requirement">Requirement / What they want</label>
                  <textarea
                    id="requirement"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    placeholder="Describe what the lead needs..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowLeadModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingLead ? 'Update Lead' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPayment ? 'Edit Payment' : 'New Payment'}</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitPayment} className="lead-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="client">Client Name <span className="required">*</span></label>
                  <select
                    id="client"
                    value={paymentFormData.client}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, client: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select a Client</option>
                    {leads
                      .filter((lead) => lead.status !== 'Won')
                      .map((lead) => (
                        <option key={lead._id} value={lead.name}>
                          {lead.name} {lead.company ? `(${lead.company})` : ''}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount (₹) <span className="required">*</span></label>
                  <input
                    type="number"
                    id="amount"
                    value={paymentFormData.amount}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={paymentFormData.date}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="method">Method</label>
                  <select
                    id="method"
                    value={paymentFormData.method}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, method: e.target.value })}
                  >
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Cash</option>
                    <option>UPI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="workedByPayment">Worked By</label>
                  <select
                    id="workedByPayment"
                    value={paymentFormData.workedBy}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, workedBy: e.target.value })}
                  >
                    <option>Not selected</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentStatus">Status</label>
                  <select
                    id="paymentStatus"
                    value={paymentFormData.status}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, status: e.target.value })}
                  >
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reference">Reference</label>
                  <input
                    type="text"
                    id="reference"
                    value={paymentFormData.reference}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, reference: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">{editingPayment ? 'Update Payment' : 'Save Payment'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="modal-overlay" onClick={() => setShowMeetingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMeeting ? 'Edit Meeting' : 'New Meeting'}</h2>
              <button className="close-btn" onClick={() => setShowMeetingModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitMeeting} className="lead-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="meetingName">Client Name <span className="required">*</span></label>
                  <select
                    id="meetingName"
                    value={meetingFormData.name}
                    onChange={(e) => setMeetingFormData({ ...meetingFormData, name: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select a Client</option>
                    {leads
                      .filter((lead) => lead.status !== 'Won')
                      .map((lead) => (
                        <option key={lead._id} value={lead.name}>
                          {lead.name} {lead.company ? `(${lead.company})` : ''}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dateTime">Date & Time <span className="required">*</span></label>
                  <input
                    type="datetime-local"
                    id="dateTime"
                    value={meetingFormData.dateTime}
                    onChange={(e) => setMeetingFormData({ ...meetingFormData, dateTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNumber"
                    value={meetingFormData.contactNumber}
                    onChange={(e) => setMeetingFormData({ ...meetingFormData, contactNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="participants">Participants</label>
                  <input
                    type="text"
                    id="participants"
                    value={meetingFormData.participants}
                    onChange={(e) => setMeetingFormData({ ...meetingFormData, participants: e.target.value })}
                    placeholder="e.g. John, Jane"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="meetingStatus">Status</label>
                  <select
                    id="meetingStatus"
                    value={meetingFormData.status}
                    onChange={(e) => setMeetingFormData({ ...meetingFormData, status: e.target.value })}
                  >
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowMeetingModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">{editingMeeting ? 'Update Meeting' : 'Save Meeting'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagementDashboard;
