const { useState,  useRef , useEffect } = React;

const mailData = {
  primary: [
    { id: 1, sender: 'Delta Enterprises', subject: 'Learn about important safety tips', description: 'Ensure your safety by following these tips.', date: 'Jan 26', isRead: false, to: 'to me' },
    { id: 2, sender: 'Fashion Forward', subject: "What's Trending at Fashion Forward!", description: 'Explore the latest fashion trends of the year.', date: '12/12/23', isRead: false, to: 'to me' },
    { id: 3, sender: 'Tech Savvy', subject: 'Are you ready this year?', description: 'Prepare for the future with cutting-edge technology.', date: '12/12/23', isRead: false, to: 'to me' }
   ],
   promotions: [
    { id: 4, sender: 'Promo Company', subject: 'Biggest Sale of the Year!', description: 'dfgdfgdfdgggg sdfsdf sdfsdfsd s d fsdf sdfsd fsd fsdf sdfsdf sdffsdfsdfsdfsdfsdf sdfsdfsdfsdfsdfsdfsdfssd sdfsdfsdfsd sdfsdfsdfsdfsdf s dfsdf sdfsd fsdf sd fs dfsd fsdf sdf sdgggggggggggdfg Don\'t miss out on our biggest sale!', date: '12/11/23', isRead: false, to: 'to me' },
    { id: 5, sender: 'Deal Hub', subject: 'Exclusive Deals for You!', description: 'Find the best deals tailored just for you.', date: '12/10/23', isRead: false, to: 'to me' }
   ],
   social: [
    { id: 6, sender: 'Social App', subject: 'You have new friend requests!', description: 'Connect with more friends on Social App.', date: '12/09/23', isRead: false, to: 'to me' },
    { id: 7, sender: 'Community Forum', subject: 'Join the latest discussions', description: 'Share your thoughts and participate in community discussions.', date: '12/08/23', isRead: false, to: 'to me' }
   ],
   sent: []
  };

function MailComponent() {
 const [activeTab, setActiveTab] = useState('primary');
 const [mails, setMails] = useState(mailData);
 const [popup, setPopup] = useState(null);
 const [isPopupOpen, setIsPopupOpen] = useState(false);
 const [visibleMailsCount, setVisibleMailsCount] = useState(0);
 const [toValue, setToValue] = useState('');
 const [items, setItems] = useState([]);
 const [newItemText, setNewItemText] = useState('');
 const [newIconColor, setNewIconColor] = useState('#000000');
 const [isFormVisible, setIsFormVisible] = useState(false);
 const [subjectValue, setSubjectValue] = useState('');
 const [sidebarActive, setSidebarActive] = useState('inbox');
 const [draggedMailId, setDraggedMailId] = useState(null);
 const [isMoreOpen, setIsMoreOpen] = useState(false);
 const [descriptionValue, setDescriptionValue] = useState('');
 const [selectedMail, setSelectedMail] = useState(null);
 const [isMailView, setIsMailView] = useState(false);
 const formRef = useRef(null);
 const buttonRef = useRef(null);
 const handleDrop = (e, droppedOnMailId) => {
  const draggedMailId = e.dataTransfer.getData("mailId");
  if (!draggedMailId) return;
  
  const draggedMailIndex = mails[activeTab].findIndex(mail => mail.id === parseInt(draggedMailId));
  const droppedOnMailIndex = mails[activeTab].findIndex(mail => mail.id === droppedOnMailId);
  if (draggedMailIndex === -1 || droppedOnMailIndex === -1) return;
  
  const updatedMails = [...mails[activeTab]];
  const [draggedMail] = updatedMails.splice(draggedMailIndex, 1);
  updatedMails.splice(droppedOnMailIndex, 0, draggedMail);
  
  setMails({ ...mails, [activeTab]: updatedMails });
  setDraggedMailId(null);
 };

 const addNewItem = () => {
  if (isFormVisible) {
   const newItem = {
    id: items.length + 1,
    text: newItemText,
    iconColor: newIconColor
   };

   setItems([...items, newItem]);
   setNewItemText('');
   setNewIconColor('#000000');
   setIsFormVisible(false);
  } else {
   setIsFormVisible(true);
  }
 };

 useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isFormVisible &&
      formRef.current &&
      !formRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsFormVisible(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
 }, [isFormVisible]);

 const handleDragStart = (e, id) => {
  e.dataTransfer.setData("mailId", id);
 };

 const toggleMore = () => {
  setIsMoreOpen(!isMoreOpen);
 };

 const handleDragOver = (e) => {
  e.preventDefault();
 };

 const handleMailClick = (mailId) => {
  const selectedMail = mails[activeTab].find(mail => mail.id === mailId);
  setSelectedMail(selectedMail);
  setIsMailView(true);
 };

 const getActiveMails = () => {
  return mails[activeTab];
 };

 useEffect(() => {
  const activeMails = getActiveMails();
  setVisibleMailsCount(activeMails.length);
  }, [activeTab, mails]);

 const openComposePopup = () => {
  setIsPopupOpen(true);
 };

 const closeComposePopup = () => {
  setIsPopupOpen(false);
  setToValue('');
  setSubjectValue('');
 };
  
 const handleSend = () => {
  const newMail = {
   id: mails.sent.length + 1,
   sender: `receiver: ${toValue}`,
   subject: subjectValue,
   description: descriptionValue,
   date: new Date().toLocaleDateString(),
   isRead: false
  };

  setMails(prevState => ({
   ...prevState,
   sent: [...prevState.sent, newMail]
  }));
  closeComposePopup();
 };
  
 const deleteMail = (id) => {
  const updatedMails = mails[activeTab].filter(mail => mail.id !== id);
  setMails((prevMails) => ({
   ...prevMails,
   [activeTab]: updatedMails
  }));
 };

 const markAsRead = (id) => {
  const updatedMails = mails[activeTab].map(mail =>
   mail.id === id ? { ...mail, isRead: true } : mail
  );
  setMails({ ...mails, [activeTab]: updatedMails });
  const selectedMail = mails[activeTab].find(mail => mail.id === id);
  setPopup(selectedMail);
 };

 return (
  <div className="mail__main">
   <div className="mail__main-sidebar">
    <button className="mail__main-sidebar-compose" onClick={openComposePopup}>
     <i className="fa-solid fa-pencil mail__main-sidebar-compose-pen"></i>
     <span className="mail__main-sidebar-compose-text">Compose</span>
    </button>

    <div className="mail__main-sidebar-side">
     <ul className="mail__main-sidebar-side-box">
      <li className={`mail__main-sidebar-side-box-usage ${sidebarActive === 'inbox' ? 'active' : ''}`} 
       style={sidebarActive === 'inbox' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}} 
       onClick={() => { setActiveTab('primary'); setSidebarActive('inbox'); }}>

       <i className="fa-solid fa-inbox mail__main-sidebar-side-box-icon"></i>
       <span className="mail__main-sidebar-side-box-text" style={sidebarActive === 'inbox' ? { fontWeight: '700' } : {}}>Inbox</span>
      </li>

      <li className="mail__main-sidebar-side-box-usage">
       <i className="fa-regular fa-star mail__main-sidebar-side-box-icon"></i>
       <span className="mail__main-sidebar-side-box-text">Starred</span>
      </li>

      <li className="mail__main-sidebar-side-box-usage">
       <i className="fa-regular fa-clock mail__main-sidebar-side-box-icon"></i>
       <span className="mail__main-sidebar-side-box-text">Snoozed</span>
      </li>

      <li className={`mail__main-sidebar-side-box-usage ${sidebarActive === 'sent' ? 'active' : ''}`} 
       style={sidebarActive === 'sent' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}} 
       onClick={() => { setActiveTab('sent'); setSidebarActive('sent'); }}>

       <i className="fa-regular fa-paper-plane mail__main-sidebar-side-box-icon"></i>
       <span className="mail__main-sidebar-side-box-text" style={sidebarActive === 'sent' ? { fontWeight: '700' } : {}}>Sent</span>
      </li>

      <li className="mail__main-sidebar-side-box-usage">
       <i className="fa-regular fa-file mail__main-sidebar-side-box-icon"></i>
       <span className="mail__main-sidebar-side-box-text">Drafts</span>
      </li>

      <li className="mail__main-sidebar-side-box-usage" onClick={toggleMore}>
       <i className={`fa-solid ${isMoreOpen ? 'fa-angle-up' : 'fa-angle-down'} mail__main-sidebar-side-box-icon`}></i>
       <span className="mail__main-sidebar-side-box-text">{isMoreOpen ? 'Less' : 'More'}</span>
      </li>

      {isMoreOpen && (
       <div className="mail__main-sidebar-side-box">
        <li className="mail__main-sidebar-side-box-extra">
         <i className="fa-regular fa-message mail__main-sidebar-side-box-icons"></i>
         <span className="mail__main-sidebar-side-box-texts">message</span>
        </li>

        <li className="mail__main-sidebar-side-box-extra">
         <i className="fa-solid fa-circle-exclamation mail__main-sidebar-side-box-icons"></i>
         <span className="mail__main-sidebar-side-box-texts">spam</span>
        </li>
       </div>
      )}
     </ul>

     <div className="mail__main-sidebar-side-down">
      <div className="mail__main-sidebar-side-down-title">
       <span className="mail__main-sidebar-side-down-title-text">Labels</span>
       <i className="fa-solid fa-plus mail__main-sidebar-side-down-icon" onClick={addNewItem} ref={buttonRef}></i>
       
       {isFormVisible && (
          <div className="mail__main-sidebar-side-down-form" ref={formRef}>
            <input
              type="text"
              placeholder="New item text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
            />
            <label>Choose Icon Color:</label>
            <input
              type="color"
              value={newIconColor}
              onChange={(e) => setNewIconColor(e.target.value)}
            />
          </div>
        )}
      </div>

      <ul className="mail__main-sidebar-side-down-box">
       <li className="mail__main-sidebar-side-down-box-usage">
        <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--first"></div>
        <span className="mail__main-sidebar-side-down-box-text">Categories</span>
       </li>

       <li className="mail__main-sidebar-side-down-box-usage">
        <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--second"></div>
        <span className="mail__main-sidebar-side-down-box-text">Team</span>
       </li>

       <li className="mail__main-sidebar-side-down-box-usage">
        <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--third"></div>
        <span className="mail__main-sidebar-side-down-box-text">News</span>
       </li>

       <li className="mail__main-sidebar-side-down-box-usage">
        <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--fourth"></div>
        <span className="mail__main-sidebar-side-down-box-text">Work</span>
       </li>

       <li className="mail__main-sidebar-side-down-box-usage">
        <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--fifth"></div>
        <span className="mail__main-sidebar-side-down-box-text">Personal</span>
       </li>

       {items.map((item) => (
        <li
         key={item.id}
         className="mail__main-sidebar-side-down-box-usage"
        >
         <i className="mail__main-sidebar-side-down-box-icons" style={{ backgroundColor: item.iconColor }}></i>
         <span className="mail__main-sidebar-side-down-box-text">
          {item.text}
         </span>
         </li>
       ))}
      </ul>
     </div>
    </div>
   </div>    

   <div className="mail__main-content">
   {!isMailView && (
    <>
    <div className="mail__main-content-top">
     <div className="mail__main-content-top-left">
      <div className="mail__main-content-top-left-select">
        <input type="checkbox" className="mail__main-content-top-left-select-checkbox"/>
        <i className="fa-solid fa-caret-down"></i>
      </div>

      <i className="fa-solid fa-arrow-rotate-right"></i>
      <i className="fa-solid fa-ellipsis-vertical"></i>
     </div>
        
     <div className="mail__main-content-top-right">
      <span className="mail__main-content-top-right-number">1-{visibleMailsCount} of {visibleMailsCount}</span>
      <i className="fa-solid fa-angle-left mail__main-content-top-right-angle"></i>
      <i className="fa-solid fa-angle-right mail__main-content-top-right-angle"></i>
     </div>
    </div>

     <div className="mail__main-content-tab">
      <button className={`mail__main-content-tab-primary ${activeTab === 'primary' ? 'active' : ''}`} 
       onClick={() => setActiveTab('primary')}
       style={activeTab === 'primary' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}
      >
       <i className="fa-solid fa-inbox"></i>
       <span className="mail__main-content-tab-primary-text">Primary</span>
      </button>

      <button className={`mail__main-content-tab-promotions ${activeTab === 'promotions' ? 'active' : ''}`} 
       onClick={() => setActiveTab('promotions')}
       style={activeTab === 'promotions' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}
      >
       <i className="fa-solid fa-tag fa-lg mail__main-content-tab-primary-icon"></i>
       <span className="mail__main-content-tab-primary-text">Promotions</span>
      </button>

      <button className={`mail__main-content-tab-social ${activeTab === 'social' ? 'active' : ''}`} 
       onClick={() => setActiveTab('social')}
       style={activeTab === 'social' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}
      >
       <i className="fa-solid fa-user-group fa-sm mail__main-content-tab-primary-icon"></i>
       <span className="mail__main-content-tab-primary-text">Social</span>
      </button>
     </div>
     </>
    )}
    
    {!isMailView && (
    <div className="mail__main-content-list">
     {getActiveMails() && Array.isArray(getActiveMails()) && getActiveMails().length > 0 && getActiveMails().map((mail) => (
       mail?.id ? (
        <div
         key={mail.id} 
         className={`mail__main-content-list-item ${mail.isRead ? 'read' : 'unread'}`} 
         onClick={() => {
          markAsRead(mail.id);
          handleMailClick(mail.id);
        }}
         draggable
         onDragStart={(e) => handleDragStart(e, mail.id)}
         onDragOver={(e) => handleDragOver(e)}
         onDrop={(e) => handleDrop(e, mail.id)}
        >
         <input type="checkbox" className="mail__main-content-list-item-checkbox"/>
         <i className="fa-regular fa-star fa-2xs mail__main-content-list-item-star"></i>
         <span className="mail__main-content-list-item-sender">{mail.sender}</span>
         <div className="mail__main-content-list-item-middle">
          <span className="mail__main-content-list-item-subject">{mail.subject} - </span>
          <span className="mail__main-content-list-item-description">{mail.description}</span>
         </div>
         
         <div className="mail__main-content-list-item-space"></div>
         <span className="mail__main-content-list-item-date">{mail.date}</span>
         <div className="mail__main-content-list-item-left">
          <i className="fa-solid fa-grip-vertical fa-xs mail__main-content-list-item-left-icon"
          onDragStart={() => handleDragStart(mail.id)}></i>
         </div>

         <div className="mail__main-content-list-item-icons">
          <i className="fa-solid fa-box-archive mail__main-content-list-item-icons-icon"></i>
          <i className="fa-solid fa-trash-can mail__main-content-list-item-icons-icon" onClick={(e) => {e.stopPropagation(); deleteMail(mail.id);}}></i>
          <i className="fa-regular fa-envelope mail__main-content-list-item-icons-icon"></i>
          <i className="fa-regular fa-clock mail__main-content-list-item-icons-icon"></i>
         </div>
        </div>
       ) : null
      ))}

     {isPopupOpen && (
      <div className="mail__main-sidebar-compose-popup">
       <div className="mail__main-sidebar-compose-popup-header">
        <span className="mail__main-sidebar-compose-popup-header-text">New Message</span>
        <div className="mail__main-sidebar-compose-popup-header-right">
         <button className="mail__main-sidebar-compose-popup-header-button" onClick={closeComposePopup}>_</button>
         <button className="mail__main-sidebar-compose-popup-header-button" onClick={closeComposePopup}>X</button>
        </div>
       </div>
          
       <div className="mail__main-sidebar-compose-popup-body">
        <div className="mail__main-sidebar-compose-popup-body-from">
         <label className="mail__main-sidebar-compose-popup-body-from-text">From</label>
         <input className="mail__main-sidebar-compose-popup-body-from-input" type="text" placeholder="sender"/>
        </div>

        <div className="mail__main-sidebar-compose-popup-body-to">
         <label className="mail__main-sidebar-compose-popup-body-to-text">To</label>
         <input className="mail__main-sidebar-compose-popup-body-to-input" type="text" placeholder="who"
         value={toValue}
         onChange={(e) => setToValue(e.target.value)}/>
        </div>
            
        <div className="mail__main-sidebar-compose-popup-body-subject">
         <label className="mail__main-sidebar-compose-popup-body-subject-text"></label>
         <input className="mail__main-sidebar-compose-popup-body-subject-input" type="text" placeholder="Subject"  
          value={subjectValue}
          onChange={(e) => setSubjectValue(e.target.value)}/>
         </div>

         <div className="mail__main-sidebar-compose-popup-body-text">
          <textarea className="mail__main-sidebar-compose-popup-body-text-inside" placeholder=""
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}></textarea>
         </div>
        </div>

        <div className="mail__main-sidebar-compose-popup-footer">
         <div className="mail__main-sidebar-compose-popup-footer-button" onClick={handleSend}>
          <span  className="mail__main-sidebar-compose-popup-footer-button-text">Send</span>
          <button className="fa-solid fa-caret-down fa-xs mail__main-sidebar-compose-popup-footer-button-icon"></button>
         </div>

         <div className="mail__main-sidebar-compose-popup-footer-icons">
          <i className="fa fa-paperclip fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa fa-image fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa fa-smile fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-brands fa-google-drive fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-regular fa-image fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-solid fa-lock fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-solid fa-pen fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-solid fa-ellipsis-vertical fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
          <i className="fa-solid fa-trash-can fa-xs mail__main-sidebar-compose-popup-footer-icons-icon--right"></i>
         </div>
        </div>
       </div>
      )}
    </div>
    )}

   {isMailView && selectedMail && (
    <div className="mail__main-content-detail">
      <div className="mail__main-content-detail-top">
       <i className="fa-solid fa-arrow-left mail__main-content-detail-back" onClick={() => setIsMailView(false)}></i>
       <div className="mail__main-content-detail-top-first">
        <i className="fa-regular fa-folder-open"></i>
        <i className="fa-solid fa-circle-exclamation"></i>
        <i className="fa-solid fa-trash-can"></i>
       </div>
      
       <div className="mail__main-content-detail-top-second">
        <i className="fa-regular fa-envelope"></i>
        <i className="fa-regular fa-clock"></i>
        <i className="fa-regular fa-circle-check"></i>
       </div>

       <div className="mail__main-content-detail-top-third">
        <i className="fa-regular fa-folder"></i>
        
        <div className="mail__main-content-detail-top-third-delete">
         <div className="mail__main-content-detail-top-third-delete-inner"></div>
        </div>

        <i className="fa-solid fa-ellipsis-vertical"></i>
       </div>
      </div>

      <div className="mail__main-content-detail-subject">
       <span className="mail__main-content-detail-subject-title">{selectedMail.subject}</span>
       <div className="mail__main-content-detail-subject-icons">
        <i className="fa-solid fa-print fa-2xs"></i>
        <i className="fa-solid fa-square-check fa-2xs"></i>
       </div>
    
      <div className="mail__main-content-detail-subject-header">
       <div className="mail__main-content-detail-subject-header-left">
        <img src="images/profile-pic.png" alt="Profile Pic mail" className="mail__main-content-detail-subject-header-left-pic"/>
        <div className="mail__main-content-detail-subject-header-left-person">
         <span className="mail__main-content-detail-subject-header-left-person-sender">{selectedMail.sender}</span>
         <span className="mail__main-content-detail-subject-header-left-person-to">{selectedMail.to}
          <i className="fa-solid fa-caret-down mail__main-content-detail-subject-header-left-person-to-sign"></i>
         </span>
        </div>
       </div>

       <div className="mail__main-content-detail-subject-header-right">
        <span className="mail__main-content-detail-subject-date">{selectedMail.date}</span>
        <i className="fa-regular fa-star fa-2xs"></i>
        <i className="fa-solid fa-arrow-turn-up fa-rotate-270 fa-2xs"></i>
        <i className="fa-solid fa-ellipsis-vertical fa-2xs"></i>
       </div>
      </div>

      <div className="mail__main-content-detail-subject-description">{selectedMail.description}
       <hr className="mail__main-content-detail-subject-divider"/>
      </div>
     </div>
    </div>
   )}
  </div>

   <div className="mail__main-right">
    <img src="images/calendar-icon.png" alt="Calendar" className="mail__main-right-pic"/>
    <img src="images/note-icon.png" alt="Note" className="mail__main-right-pic"/>
    <i className="fa-solid fa-user mail__main-right-pic"></i>
    <hr className="mail__main-right-divider"/>
    <i className="fa-solid fa-plus mail__main-right-icon"></i>
   </div>
  </div>
 );
}

function ComposePopup({ onClose }) {
 const [subject, setSubject] = useState("");
}

function toggleSidebar() {
 const sidebar = document.querySelector('.mail__main-sidebar');
 sidebar.classList.toggle('collapsed');
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<MailComponent/>);