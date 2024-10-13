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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Aktif sekmeye göre mail listesini güncelle
  const getActiveMails = () => {
    return mails[activeTab];
  };

  const openComposePopup = () => {
    setIsPopupOpen(true);
  };

  const closeComposePopup = () => {
    setIsPopupOpen(false);
  };
  
  // Tıklanan mail'i okundu olarak işaretle ve popup'ı göster
  const markAsRead = (id) => {
    const updatedMails = mails[activeTab].map(mail =>
      mail.id === id ? { ...mail, isRead: true } : mail
    );
    setMails({ ...mails, [activeTab]: updatedMails });

    // Tıklanan mail'in bilgilerini popup için ayarla
    const selectedMail = mails[activeTab].find(mail => mail.id === id);
    setPopup(selectedMail);
  };

  return (
    <div className="mail__main">
  <div className="mail__sidebar">
      <button className="mail__sidebar-compose" onClick={openComposePopup}>
        <i className="fa-solid fa-pencil mail__sidebar-compose-pen"></i>
        <span className="mail__sidebar-compose-text">Compose</span>
      </button>

      <div className="mail__sidebar-side">
        <ul className="mail__sidebar-side-box">
          <li className="mail__sidebar-side-box-usage">
            <i className="fa-solid fa-inbox mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">Inbox</span>
          </li>

          <li className="mail__sidebar-side-box-usage">
            <i className="fa-regular fa-star mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">Starred</span>
          </li>

          <li className="mail__sidebar-side-box-usage">
            <i className="fa-regular fa-clock mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">Snoozed</span>
          </li>

          <li className="mail__sidebar-side-box-usage">
            <i className="fa-regular fa-paper-plane mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">Sent</span>
          </li>

          <li className="mail__sidebar-side-box-usage">
            <i className="fa-regular fa-file mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">Drafts</span>
          </li>

          <li className="mail__sidebar-side-box-usage">
            <i className="fa-solid fa-angle-down mail__sidebar-side-box-icon"></i>
            <span className="mail__sidebar-side-box-text">More</span>
          </li>
        </ul>

        <div className="mail__sidebar-side-down">
          <div className="mail__sidebar-side-down-title">
            Labels
            <i className="fa-solid fa-plus mail__sidebar-side-down-title-icon"></i>
          </div>

          <ul className="mail__sidebar-side-down-box">
            <li className="mail__sidebar-side-down-box-usage">
              <div className="mail__sidebar-side-down-box-icon mail__sidebar-side-down-box-icon--first"></div>
              <span className="mail__sidebar-side-down-box-text">Categories</span>
            </li>

            <li className="mail__sidebar-side-down-box-usage">
              <div className="mail__sidebar-side-down-box-icon mail__sidebar-side-down-box-icon--second"></div>
              <span className="mail__sidebar-side-down-box-text">Team</span>
            </li>

            <li className="mail__sidebar-side-down-box-usage">
              <div className="mail__sidebar-side-down-box-icon mail__sidebar-side-down-box-icon--third"></div>
              <span className="mail__sidebar-side-down-box-text">News</span>
            </li>

            <li className="mail__sidebar-side-down-box-usage">
              <div className="mail__sidebar-side-down-box-icon mail__sidebar-side-down-box-icon--fourth"></div>
              <span className="mail__sidebar-side-down-box-text">Work</span>
            </li>

            <li className="mail__sidebar-side-down-box-usage">
              <div className="mail__sidebar-side-down-box-icon mail__sidebar-side-down-box-icon--fifth"></div>
              <span className="mail__sidebar-side-down-box-text">Personal</span>
            </li>
          </ul>
        </div>
      </div>
    </div>    

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

     {isPopupOpen && (
        <div className="mail__sidebar-compose-popup">
          <div className="mail__sidebar-compose-popup-header">
            <h4 className="mail__sidebar-compose-popup-header-text">New Message</h4>
            <div className="mail__sidebar-compose-popup-header-right">
              <button className="mail__sidebar-compose-popup-header-button" onClick={() => alert('Minimize clicked')}>_</button>
              <button className="mail__sidebar-compose-popup-header-button" onClick={closeComposePopup}>X</button>
            </div>
          </div>
          
          <div className="mail__sidebar-compose-popup-body">
            <div className="mail__sidebar-compose-popup-body-from">
              <label className="mail__sidebar-compose-popup-body-from-text">From</label>
              <input className="mail__sidebar-compose-popup-body-from-input" type="text" placeholder="sender" readOnly />
            </div>

            <div className="mail__sidebar-compose-popup-body-to">
              <label className="mail__sidebar-compose-popup-body-to-text">To</label>
              <input className="mail__sidebar-compose-popup-body-to-input" type="text" placeholder="who" />
            </div>
            
            <div className="mail__sidebar-compose-popup-body-subject">
              <label className="mail__sidebar-compose-popup-body-subject-text">Subject</label>
              <input className="mail__sidebar-compose-popup-body-subject-input" type="text" placeholder="" />
            </div>

            <div className="mail__sidebar-compose-popup-body-text">
              <textarea className="mail__sidebar-compose-popup-body-text-inside" placeholder=""></textarea>
            </div>
          </div>

          <div className="mail__sidebar-compose-popup-footer">
            <button className="mail__sidebar-compose-popup-footer-button">Send
            <button class="fa-solid fa-caret-down fa-xs mail__sidebar-compose-popup-footer-button-icon"></button>
            </button>

            <div className="mail__sidebar-compose-popup-footer-icons">
              <i className="fa fa-paperclip fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i className="fa fa-image fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i className="fa fa-smile fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-brands fa-google-drive fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-regular fa-image fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-solid fa-lock fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-solid fa-pen fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-solid fa-ellipsis-vertical fa-xs mail__sidebar-compose-popup-footer-icons-icon"></i>
              <i class="fa-solid fa-trash-can fa-xs mail__sidebar-compose-popup-footer-icons-icon--right"></i>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}

function ComposePopup({ onClose }) {
  const [subject, setSubject] = useState("");

  return (
    <div className="mail__sidebar-compose-popup">
    <div className="mail__sidebar-compose-popup-header">
      <h4 className="mail__sidebar-compose-popup-header-text">New Message</h4>
      <div className="mail__sidebar-compose-popup-header-right">
        <button className="mail__sidebar-compose-popup-header-button" onClick={() => alert('Minimize clicked')}>_</button>
        <button className="mail__sidebar-compose-popup-header-button" onClick={closeComposePopup}>X</button>
      </div>
    </div>
    
    <div className="mail__sidebar-compose-popup-body">
      <div className="mail__sidebar-compose-popup-body-from">
        <label className="mail__sidebar-compose-popup-body-from-text">From</label>
        <input className="mail__sidebar-compose-popup-body-from-input" type="text" placeholder="youremail@example.com" readOnly />
      </div>

      <div className="mail__sidebar-compose-popup-body-to">
        <label className="mail__sidebar-compose-popup-body-to-text">To</label>
        <input className="mail__sidebar-compose-popup-body-to-input" type="text" placeholder="Recipient's email" />
      </div>
      
      <div className="mail__sidebar-compose-popup-body-subject">
        <label className="mail__sidebar-compose-popup-body-subject-text">Subject</label>
        <input className="mail__sidebar-compose-popup-body-subject-input" type="text" placeholder="Subject" />
      </div>

      <div className="mail__sidebar-compose-popup-body-text">
        <textarea className="mail__sidebar-compose-popup-body-text-inside" placeholder="Message content..."></textarea>
      </div>
    </div>

    <div className="mail__sidebar-compose-popup-footer">
      <button className="mail__sidebar-compose-popup-footer-button">Send</button>

      <div className="mail__sidebar-compose-popup-footer-icons">
        <i className="fa fa-paperclip mail__sidebar-compose-popup-footer-icon"></i>
        <i className="fa fa-image mail__sidebar-compose-popup-footer-icon"></i>
        <i className="fa fa-smile mail__sidebar-compose-popup-footer-icon"></i>
      </div>
    </div>
  </div>
  );
}

// React bileşenini render et
ReactDOM.render(<MailComponent />, document.getElementById('root'));
