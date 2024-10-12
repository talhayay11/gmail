const { useState } = React;

// Farklı mail listeleri
const mailData = {
  primary: [
    { id: 1, sender: 'Delta Enterprises', subject: 'Learn about important safety tips', date: 'Jan 26', isRead: false },
    { id: 2, sender: 'Fashion Forward', subject: "What's Trending at Fashion Forward!", date: '12/12/23', isRead: false },
    { id: 3, sender: 'Tech Savvy', subject: 'Are you ready this year?', date: '12/12/23', isRead: false }
  ],
  promotions: [
    { id: 4, sender: 'Promo Company', subject: 'Biggest Sale of the Year!', date: '12/11/23', isRead: false },
    { id: 5, sender: 'Deal Hub', subject: 'Exclusive Deals for You!', date: '12/10/23', isRead: false }
  ],
  social: [
    { id: 6, sender: 'Social App', subject: 'You have new friend requests!', date: '12/09/23', isRead: false },
    { id: 7, sender: 'Community Forum', subject: 'Join the latest discussions', date: '12/08/23', isRead: false }
  ]
};

// MailList bileşeni
function MailComponent() {
  // Başlangıçta 'primary' sekmesi aktif
  const [activeTab, setActiveTab] = useState('primary');
  const [mails, setMails] = useState(mailData);
  const [popup, setPopup] = useState(null);

  // Aktif sekmeye göre mail listesini güncelle
  const getActiveMails = () => {
    return mails[activeTab];
  };
  
  const markAsRead = (id) => {
    const updatedMails = mails[activeTab].map(mail =>
      mail.id === id ? { ...mail, isRead: true } : mail
    );
    setMails({ ...mails, [activeTab]: updatedMails });
    setPopup(id);
  };

  return (
    <div className="mail__content">
            {/* Üst kısım */}
      <div className="mail__content-top">
        <div className="mail__content-top-left">
          <div className="mail__content-top-left-select">
            <input type="checkbox" className="mail__content-top-left-select-checkbox" />
            <i className="fa-solid fa-caret-down"></i>
          </div>

          <i className="fa-solid fa-arrow-rotate-right"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        
        <div className="mail__content-top-right">
          <span className="mail__content-top-right-number">1-16 of 16</span>
          <i className="fa-solid fa-angle-left"></i>
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
      {/* Tablar */}
      <div className="mail__content-tab">
        <button 
          className={`mail__content-tab-primary ${activeTab === 'primary' ? 'active' : ''}`} 
          onClick={() => setActiveTab('primary')}
        >
          <i className="fa-solid fa-inbox fa-xs mail__content-tab-primary-icon"></i>
          <span className="mail__content-tab-primary-text">Primary</span>
        </button>

        <button 
          className={`mail__content-tab-promotions ${activeTab === 'promotions' ? 'active' : ''}`} 
          onClick={() => setActiveTab('promotions')}
        >
          <i className="fa-solid fa-tag fa-lg mail__content-tab-primary-icon"></i>
          <span className="mail__content-tab-primary-text">Promotions</span>
        </button>

        <button 
          className={`mail__content-tab-social ${activeTab === 'social' ? 'active' : ''}`} 
          onClick={() => setActiveTab('social')}
        >
          <i className="fa-solid fa-user-group fa-sm mail__content-tab-primary-icon"></i>
          <span className="mail__content-tab-primary-text">Social</span>
        </button>
      </div>

      {/* Mail listesi */}
      <div className="mail__content-list">
        {getActiveMails().map((mail) => (
          <div
          key={mail.id} 
          className={`mail__content-list-item ${mail.isRead ? 'read' : 'unread'}`} 
          onClick={() => markAsRead(mail.id)}  // Mail tıklandığında "read" olur
        >
            <input type="checkbox" className="mail__content-list-item-checkbox" />
            <i className="fa-regular fa-star fa-2xs mail__content-list-item-star"></i>
            <span className="mail__content-list-item-sender">{mail.sender}</span>
            <span className="mail__content-list-item-subject">{mail.subject}</span>
            <span className="mail__content-list-item-date">{mail.date}</span>
          </div>
        ))}
      </div>

      {popup && (
            <div className="mail__popup show">
              <h4>From: {popup.sender}</h4>
              <p><strong>Subject:</strong> {popup.subject}</p>
              <p><strong>Date:</strong> {popup.date}</p>
              <p>{popup.content}</p>
              <button onClick={() => setPopup(null)}>Close</button>
            </div>
            )}
    </div>
  );
}

// React bileşenini render et
ReactDOM.render(<MailComponent/>, document.getElementById('root'));
