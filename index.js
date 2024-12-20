const { useState,  useRef , useEffect } = React;

const mailData = {
 primary: [
  {
   id: 1,
   sender: 'Acme Inc.',
   subject: 'Insights',
   description: 'The latest in industrial equipment and tools',
   date: 'Feb 26, 2024',
   time: '14:30',
   isRead: false,
   to: 'to me'
  },

  {
   id: 2,
   sender: 'Travel Tales',
   subject: "Our latest Adventures and Destinations",
   description: 'Our latest Adventures and Destinations',
   date: 'March 26, 2024',
   time: '10:15', isRead: false,
   to: 'to me'
  },

  {
   id: 3,
   sender: 'Delta Enterprises',
   subject: 'Delta Weekly News',
   description: 'Learn about important safety tips before you fly!',
   date: 'Jan 26, 2024',
   time: '09:45',
   isRead: false,
   to: 'to me'
  }
 ],

 promotions: [
  {
   id: 4,
   sender: 'Epsilon Solutions',
   subject: 'Industry trends and best practices',
   description: 'Insights Industry trends and best practices',
   date: 'Jan 26, 2024',
   time: '16:20',
   isRead: false,
   to: 'to me'
  },

  {
   id: 5,
   sender: 'Foodie Finds',
   subject: 'Recipe Ideas and Restaurant Reviews!',
   description: 'Our Complete list of Recipe Ideas and Restaurant Reviews!',
   date: 'Jan 26, 2024',
   time: '11:05',
   isRead: false,
   to: 'to me'
  },

  {
   id: 6,
   sender: 'Company Name',
   subject: 'Lorem ipsum dolor sit amet consectetur.',
   description: 'Ac eget eu eget ullamcorper tellus sem scelerisque sit ante.',
   date: 'Jan 26, 2024',
   time: '13:50',
   isRead: false,
   to: 'to me' 
  }
 ],

 social: [
  {
   id: 7,
   sender: 'Fashion Forward',
   subject: 'See what\'s Trending at Fashion Forward!',
   description: 'Style Inspiration and Trends',
   date: 'Dec 12, 2023',
   time: '15:00',
   isRead: false,
   to: 'to me'
  },

  {
   id: 8,
   sender: 'Tech Savvy',
   subject: 'Are you ready this year?',
   description: 'Check out our Popular Gadgets and Software from last year!',
   date: 'Dec 12, 2023',
   time: '17:30',
   isRead: false,
   to: 'to me'
  },

  {
   id: 9,
   sender: 'Company Name',
   subject: 'Lorem ipsum dolor sit amet consectetur.',
   description: 'Ac eget eu eget ullamcorper tellus sem scelerisque sit ante.',
   date: 'Dec 12, 2023',
   time: '08:10',
   isRead: false,
   to: 'to me'
  }
 ],
 starred: [],
 sent: [],
 bin: []
};

function MailComponent() {
 const [activeTab, setActiveTab] = useState('primary');
 const [isActive, setIsActive] = useState(false);
 const [isChecked, setIsChecked] = useState(false);
 const selectRef = useRef(null);
 const [mails, setMails] = useState(mailData);
 const [filteredMails, setFilteredMails] = useState(null);
 const [searchValue, setSearchValue] = useState('');
 const [isSearchClicked, setIsSearchClicked] = useState(false);
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
 const [starredMails, setStarredMails] = useState([]);
 const [isPopupMinimized, setIsPopupMinimized] = useState(false);
 const formRef = useRef(null);
 const buttonRef = useRef(null);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [selectedOption, setSelectedOption] = useState('');
 const [selectedMails, setSelectedMails] = useState([]);
 const [unreadCount, setUnreadCount] = useState(0);
 const notificationSound = useRef(null);
 const [isMissingRecipient, setIsMissingRecipient] = useState(false);
 const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
 const optionsMenuRef = useRef(null);
 const missingRecipientRef = useRef(null);
 const [isCaretTooltipVisible, setIsCaretTooltipVisible] = useState(false);
 const [isDownTooltipVisible, setIsDownTooltipVisible] = useState(false);
 const showCaretTooltip = () => setIsCaretTooltipVisible(true);
 const hideCaretTooltip = () => setIsCaretTooltipVisible(false);
 const showDownTooltip = () => setIsDownTooltipVisible(true);
 const hideDownTooltip = () => setIsDownTooltipVisible(false);

 useEffect (() => {
  const countUnreadMails = () => {
   const unread = mails.primary.filter((mail) => !mail.isRead).length;
    setUnreadCount(unread);
  };
  countUnreadMails();
 }, [mails.primary]);

 const toggleOptionsMenu = () => {
  setIsOptionsMenuOpen(!isOptionsMenuOpen);
 };

 useEffect (() => {
  const handleClickOutside = (event) => {
   if (isOptionsMenuOpen && optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
    setIsOptionsMenuOpen(false);
   }
   if (isMissingRecipient && missingRecipientRef.current && !missingRecipientRef.current.contains(event.target)) {
    setIsMissingRecipient(false);
   }
  };

  document.addEventListener ('mousedown', handleClickOutside);
  return () => {
   document.removeEventListener ('mousedown', handleClickOutside);
  };
 }, [isOptionsMenuOpen, isMissingRecipient]);

 const formatDate = (dateString, includeYear = false, timeString = '') => {
  const options = includeYear 
   ? { year: 'numeric', month: 'short', day: 'numeric' }
   : { month: 'short', day: 'numeric' };

  const datePart = new Date(dateString).toLocaleDateString('en-US', options);
  return timeString ? `${datePart}, ${timeString}` : datePart;
 };

 const [checkboxState, setCheckboxState] = useState ({
  all: false,
  none: false,
  read: false,
  unread: false,
  starred: false,
  unstarred: false
 });

 const handleOptionSelect = (option) => {
  setSelectedOption(option);
  const activeMails = getActiveMails();
  switch (option) {
   case 'all':
   setCheckboxState ({
    all: true,
    none: false,
    read: false,
    unread: false,
    starred: false,
    unstarred: false,
   });
   setSelectedMails(activeMails.map(mail => mail.id));
   break;

   case 'none':
   setCheckboxState ({
    all: false,
    none: true,
    read: false,
    unread: false,
    starred: false,
    unstarred: false,
   });
   setSelectedMails([]);
   break;

   case 'read':
   setCheckboxState ({
    all: false,
    none: false,
    read: true,
    unread: false,
    starred: false,
    unstarred: false,
   });
   setSelectedMails(activeMails.filter(mail => mail.isRead).map(mail => mail.id));
   break;

   case 'unread':
   setCheckboxState ({
    all: false,
    none: false,
    read: false,
    unread: true,
    starred: false,
    unstarred: false,
   });
   setSelectedMails(activeMails.filter(mail => !mail.isRead).map(mail => mail.id));
   break;

   case 'starred':
   setCheckboxState ({
    all: false,
    none: false,
    read: false,
    unread: false,
    starred: true,
    unstarred: false,
   });
   setSelectedMails(activeMails.filter(mail => mail.isStarred).map(mail => mail.id));
   break;

   case 'unstarred':
   setCheckboxState ({
    all: false,
    none: false,
    read: false,
    unread: false,
    starred: false,
    unstarred: true,
   });
   setSelectedMails(activeMails.filter(mail => !mail.isStarred).map(mail => mail.id));
   break;
   default:
   break;
  }
  setIsDropdownOpen(false);
 };

 const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
 };

 const handleSelectClick = (e) => {
  e.stopPropagation();
  setIsActive(true);
 };

 useEffect (() => {
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
 }, []);

 const handleTopCheckboxChange = () => {
  const activeMails = getActiveMails();
  if (selectedMails.length === activeMails.length) {
   setSelectedMails([]);
  } else {
   setSelectedMails(activeMails.map(mail => mail.id));
  }
 };

 useEffect (() => {
  const handleClickOutside = (event) => {
   if (!event.target.closest('.mail__main-content-top-left-select-dropdown-menu') &&
   !event.target.closest('.mail__main-content-top-left-select')) {
    setIsDropdownOpen(false);
   }
  };
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
 }, []);

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

 const handleSearchChange = (e) => {
  const value = e.target.value.toLowerCase();
  setSearchValue(value);
  if (value) {
   const filtered = Object.keys(mails).reduce((acc, tab) => {
    acc[tab] = mails[tab].filter((mail) =>
     mail.sender.toLowerCase().includes(value) ||
     mail.subject.toLowerCase().includes(value) ||
     mail.description.toLowerCase().includes(value)
    );
    return acc;
   }, {});
   setFilteredMails(filtered);
  } else {
  setFilteredMails(null);
  }
 };

 const toggleMinimizePopup = () => {
  setIsPopupMinimized(!isPopupMinimized);
 };

 const handleStarClick = (mailId) => {
  let mailToStar = mails[activeTab].find((mail) => mail.id === mailId) || starredMails.find((mail) => mail.id === mailId);
  if (!mailToStar) return;

  const updatedMail = { ...mailToStar, isStarred: !mailToStar.isStarred };
  const updatedOriginalMails = Object.keys(mails).reduce((acc, tab) => {
   acc[tab] = mails[tab].map((mail) => mail.id === mailId ? updatedMail : mail);
   return acc;
  }, {});

  setMails(updatedOriginalMails);
  const updatedStarredMails = updatedMail.isStarred
   ? [...starredMails, updatedMail]
   : starredMails.filter((mail) => mail.id !== mailId);
   setStarredMails(updatedStarredMails);

  if (selectedMail?.id === mailId) {
   setSelectedMail(updatedMail);
  }
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

 useEffect (() => {
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
  const selectedMail = mails[activeTab].find((mail) => mail.id === mailId) || starredMails.find((mail) => mail.id === mailId);
  
  if (activeTab === 'sent' && selectedMail) {
   selectedMail.sender = `John Doe <supercoolman@gmail.com>`;
  }
  
  setSelectedMail(selectedMail);
  setIsMailView(true);
 };

 const handleSearchClick = () => {
  setIsSearchClicked(true);
 };

 const handleClickOutside = (event) => {
  if (!event.target.closest('.mail__navbar-search')) {
   setIsSearchClicked(false);
  }

  if (selectRef.current && !selectRef.current.contains(event.target)) {
   setIsActive(false);
   setIsChecked(false);
  }
 };

 const handleCheckboxChange = (e) => {
  e.stopPropagation();
  setIsChecked(e.target.checked);
  handleSelectClick(e);
  handleTopCheckboxChange();
 };

 useEffect (() => {
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 const getActiveMails = () => {
  if (activeTab === 'starred') {
   if (searchValue) {
    return starredMails.filter((mail) =>
     mail.sender.toLowerCase().includes(searchValue) ||
     mail.subject.toLowerCase().includes(searchValue) ||
     mail.description.toLowerCase().includes(searchValue)
    );
   }
   return starredMails.filter(mail => mail.isStarred);
  } else if (activeTab === 'bin') {
   return mails.bin;
  }
  const currentMails = filteredMails ? filteredMails[activeTab] : mails[activeTab];
  return currentMails;
 };

 useEffect (() => {
  const activeMails = getActiveMails();
  setVisibleMailsCount(activeMails.length);
  }, [activeTab, mails]);

 const openComposePopup = () => {
  setIsPopupOpen(true);
  setIsPopupMinimized(false);
 };

 const closeComposePopup = () => {
  setIsPopupOpen(false);
  setToValue('');
  setSubjectValue('');
 };

 const handleSend = () => {
  if (!toValue.trim()) {
   setIsMissingRecipient(true);
   return;
  }

  const now = new Date();
  const newMail = {
   id: Date.now(),
   sender: `To: ${toValue}`,
   subject: subjectValue,
   description: descriptionValue,    
   date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
   time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
   isRead: false,
   to: `To: ${toValue}`
  };

  setMails(prevState => ({
   ...prevState,
   sent: [...prevState.sent, newMail]
  }));
  setDescriptionValue('');
  closeComposePopup();

  if (notificationSound.current) {
   notificationSound.current.play();
  }
 };

 const closeMissingRecipientForm = () => {
  setIsMissingRecipient(false);
 };

 const handleToggleRead = (mailId) => {
  const updatedOriginalMails = Object.keys(mails).reduce((acc, tab) => {
   acc[tab] = mails[tab].map((mail) =>
    mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
   );
  return acc;
  }, {});
  setMails(updatedOriginalMails);

  if (selectedMail?.id === mailId) {
   setSelectedMail({ ...selectedMail, isRead: !selectedMail.isRead });
  }
 };

 const deleteMail = (id) => {
  let deletedMail = null;
  const updatedOriginalMails = Object.keys(mails).reduce((acc, tab) => {
   acc[tab] = mails[tab].filter(mail => {
    if (mail.id === id) {
     deletedMail = mail;
     return false;
    }
    return true;
   });
   return acc;
  }, {});

  if (activeTab === 'bin') {
   setMails(updatedOriginalMails);
  } else {
   if (deletedMail) {
    updatedOriginalMails.bin = [...mails.bin, deletedMail];
   }
   setMails(updatedOriginalMails);
  }
  const updatedStarredMails = starredMails.filter(mail => mail.id !== id);
  setStarredMails(updatedStarredMails);
 };

 const markAsRead = (id) => {
  const updatedOriginalMails = Object.keys(mails).reduce((acc, tab) => {
   acc[tab] = mails[tab].map((mail) => mail.id === id ? { ...mail, isRead: true } : mail);
   return acc;
  }, {});

  setMails(updatedOriginalMails);
  const updatedStarredMails = starredMails.map((mail) =>
    mail.id === id ? { ...mail, isRead: true } : mail
  );
  setStarredMails(updatedStarredMails);
  const selectedMail = mails[activeTab].find(mail => mail.id === id);
  setPopup(selectedMail);
 };

 const handleCheckboxClick = (e, id) => {
  e.stopPropagation();
  setSelectedMails((prevSelectedMails) => {
   if (prevSelectedMails.includes(id)) {
    return prevSelectedMails.filter((mailId) => mailId !== id);
   } else {
    return [...prevSelectedMails, id];
   }
  });
 };

 return (
  <div className="mail">
   <audio ref={notificationSound} src="/no.mp3"/>
   <nav className="mail__navbar">
    <div className="mail__navbar-left">
     <i className="fa-solid fa-bars mail__navbar-left-menu" onClick={toggleSidebar}></i>
     <img src="images/gmail-icon.png" alt="Gmail Logo" className="mail__navbar-left-logo"/>
     <span className="mail__navbar-left-text">Gmail</span>
    </div>

    <div className={`mail__navbar-search ${isSearchClicked ? 'active' : ''}`} onClick={handleSearchClick}>
     <i className="fa-solid fa-magnifying-glass mail__navbar-search-box--search"></i>
     <input type="text" placeholder="Search mail" className="mail__navbar-search-box"
      value={searchValue} onChange={handleSearchChange}
     />

     <i className="fa-solid fa-sliders mail__navbar-search-box--slider"></i>
    </div>

    <div className="mail__navbar-right">
     <i className="fa-regular fa-circle-question mail__navbar-right-icon"></i>
     <i className="fa-solid fa-gear mail__navbar-right-icon"></i>
     <i className="fa-solid fa-table-cells mail__navbar-right-icon"></i>
     <img src="images/profile-pic.png" alt="Profile Pic" className="mail__navbar-right-pic" />
    </div>
   </nav>

   <div className="mail__main">
    <div className="mail__main-sidebar">
     <button className="mail__main-sidebar-compose" onClick={openComposePopup}>
      <i className="fa-solid fa-pencil mail__main-sidebar-compose-pen"></i>
      <span className="mail__main-sidebar-compose-text">Compose</span>
     </button>

     <div className="mail__main-sidebar-side">
      <ul className="mail__main-sidebar-side-box">
       <li className={`mail__main-sidebar-side-box-usage 
        ${sidebarActive === 'inbox' ? 'active' : ''}`}
         style={sidebarActive === 'inbox' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}}
         onClick={() => { setActiveTab('primary'); setSidebarActive('inbox'); setIsMailView(false);}}>

        <i className="fa-solid fa-inbox mail__main-sidebar-side-box-icon"></i>
        <span className="mail__main-sidebar-side-box-text"
         style={sidebarActive === 'inbox' ? { fontWeight: '700' } : {}}>Inbox</span>
         { unreadCount > 0 && ( <span className="mail__main-sidebar-side-box-unread-count">{unreadCount}</span> )}
       </li>

       <li className={`mail__main-sidebar-side-box-usage ${sidebarActive === 'starred' ? 'active' : ''}`}
        style={sidebarActive === 'starred' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}}
        onClick={() => { setActiveTab('starred'); setSidebarActive('starred'); setIsMailView(false); }}>

        <i className={`mail__main-sidebar-side-box-icon mail__main-sidebar-side-box-icon--style ${sidebarActive === 'starred' ? 'fa-solid fa-star' : 'fa-regular fa-star'}`}></i>
        <span className="mail__main-sidebar-side-box-text"
         style={sidebarActive === 'starred' ? { fontWeight: '700' } : {}}>Starred
        </span>
       </li>

       <li className="mail__main-sidebar-side-box-usage">
        <i className="fa-regular fa-clock mail__main-sidebar-side-box-icon"></i>
        <span className="mail__main-sidebar-side-box-text">Snoozed</span>
       </li>

       <li className={`mail__main-sidebar-side-box-usage ${sidebarActive === 'sent' ? 'active' : ''}`} 
        style={sidebarActive === 'sent' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}} 
        onClick={() => { setActiveTab('sent'); setSidebarActive('sent'); setIsMailView(false); }}>

        <i className={`mail__main-sidebar-side-box-icon mail__main-sidebar-side-box-icon--style ${sidebarActive === 'sent' ? 'fa-solid fa-paper-plane' : 'fa-regular fa-paper-plane'}`}></i>
        <span className="mail__main-sidebar-side-box-text"
         style={sidebarActive === 'sent' ? { fontWeight: '700' } : {}}>Sent
        </span>
       </li>

       <li className="mail__main-sidebar-side-box-usage">
        <i className="fa-regular fa-file mail__main-sidebar-side-box-icon mail__main-sidebar-side-box-icon--draft"></i>
        <span className="mail__main-sidebar-side-box-text">Drafts</span>
       </li>

       <li className="mail__main-sidebar-side-box-usage" onClick={toggleMore}>
        <i className={`fa-solid ${isMoreOpen ? 'fa-angle-up' : 'fa-angle-down'} mail__main-sidebar-side-box-icon mail__main-sidebar-side-box-icon--draft`}></i>
        <span className="mail__main-sidebar-side-box-text">{isMoreOpen ? 'Less' : 'More'}</span>
       </li>

       {isMoreOpen && (
        <div className="mail__main-sidebar-side-box">
         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-solid fa-file-import mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Important</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-regular fa-message mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Chats</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-solid fa-paper-plane mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Scheduled</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-solid fa-envelope mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">All Mail</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-solid fa-circle-exclamation mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Spam</span>
         </li>

         <li className={`mail__main-sidebar-side-box-extra ${sidebarActive === 'bin' ? 'active' : ''}`}
          style={sidebarActive === 'bin' ? { backgroundColor: '#d3e3fd', color: '#333333' } : {}}
          onClick={() => { setActiveTab('bin'); setSidebarActive('bin'); setIsMailView(false);}}>

          <i className={`mail__main-sidebar-side-box-icons ${sidebarActive === 'bin' ? 'fa-solid fa-trash-can' : 'fa-regular fa-trash-can'}`}></i>
          <span className="mail__main-sidebar-side-box-texts" style={sidebarActive === 'bin' ? { fontWeight: '700' } : {}}>Bin</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <div className="mail__main-sidebar-side-box-extra-cat">
           <i className="fa-solid fa-caret-right fa-2xs mail__main-content-detail-top-third-delete--down"></i>
           <div className="mail__main-content-detail-top-third-delete mail__main-content-detail-top-third-delete--side">
            <div className="mail__main-content-detail-top-third-delete-inner"></div>
           </div>
          </div>

         <span className="mail__main-sidebar-side-box-texts">Categories</span>
         </li>

         <li className="mail__main-sidebar-side-box-extra">
          <i className="fa-solid fa-gear mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Manage labels</span>
         </li>

         <li className={`mail__main-sidebar-side-box-extra ${newItemText ? 'active' : 'disabled'}`}
          onClick={addNewItem}
          disabled={!newItemText}>

          <i className="fa-solid fa-plus mail__main-sidebar-side-box-icons"></i>
          <span className="mail__main-sidebar-side-box-texts">Create new label</span>
         </li>
        </div>
       )}
      </ul>

      <div className="mail__main-sidebar-side-down">
       <div className="mail__main-sidebar-side-down-title">
        <span className="mail__main-sidebar-side-down-title-text">Labels</span>
        <i className="fa-solid fa-plus mail__main-sidebar-side-down-icon"
         onClick={addNewItem} ref={buttonRef}>
        </i>
       
        {isFormVisible && (
         <div className="mail__main-sidebar-side-down-overlay">
          <div className="mail__main-sidebar-side-down-form" ref={formRef}>
           <h3 className="mail__main-sidebar-side-down-form-title">Add New Label</h3>
           <label>Add Text:</label>
           <input
            type="text"
            placeholder="New item text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
           />
          
           <label>Choose Icon Color:</label>
           <input type="color" value={newIconColor} onChange={(e) => setNewIconColor(e.target.value)}/>

           <div className="mail__main-sidebar-side-down-form-button">
            <button className="mail__main-sidebar-side-down-form-button-cancel"
             onClick={() => setIsFormVisible(false)}>Cancel
            </button>

            <button className={`mail__main-sidebar-side-down-form-button-add ${newItemText ? 'active' : 'disabled'}`}
             onClick={addNewItem}
             disabled={!newItemText}>Add Item
            </button>
           </div>
          </div>
         </div>
        )}
       </div>

       <ul className="mail__main-sidebar-side-down-box">
        <li className="mail__main-sidebar-side-down-box-usage">
         <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--first"></div>
         <span className="mail__main-sidebar-side-down-box-text">Categories</span>
         <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
        </li>

     {/*<li className="mail__main-sidebar-side-down-box-usage">
         <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--second"></div>
         <span className="mail__main-sidebar-side-down-box-text">Team</span>
         <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
        </li> */}

     {/*<li className="mail__main-sidebar-side-down-box-usage">
         <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--third"></div>
         <span className="mail__main-sidebar-side-down-box-text">News</span>
         <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
        </li> */}

     {/*<li className="mail__main-sidebar-side-down-box-usage">
         <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--fourth"></div>
         <span className="mail__main-sidebar-side-down-box-text">Work</span>
         <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
        </li> */}

     {/*<li className="mail__main-sidebar-side-down-box-usage">
         <div className="mail__main-sidebar-side-down-box-icon mail__main-sidebar-side-down-box-icon--fifth"></div>
         <span className="mail__main-sidebar-side-down-box-text">Personal</span>
         <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
        </li> */}

        {items.map((item) => (
         <li key={item.id} className="mail__main-sidebar-side-down-box-usage">
          <i className="mail__main-sidebar-side-down-box-icons" style={{ backgroundColor: item.iconColor }}></i>
          <span className="mail__main-sidebar-side-down-box-text">{item.text}</span>
          <i className="fa-solid fa-ellipsis-vertical mail__main-sidebar-side-down-box-vertical"></i>
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
        <div className="mail__main-content-top-left-select"
          ref={selectRef}
          onClick={handleSelectClick}
          style={isActive ? { backgroundColor: '#E4E4E4', borderRadius: '8px' } : {}}
          >

         <input type="checkbox" className="mail__main-content-top-left-select-checkbox"
           style={isActive ? { backgroundColor: '#D9D9D9', borderRadius: '8px' } : {}}
           onChange={(e) => {
            e.stopPropagation();
            handleCheckboxChange;
            handleTopCheckboxChange();
           }}/>

         <i className="fa-solid fa-caret-down fa-xs mail__main-content-top-left-select-down"
          onClick={(e) => {
           e.stopPropagation();
           handleSelectClick(e);
           toggleDropdown();
          }}>
         </i>
        </div>

        <i className="fa-solid fa-arrow-rotate-right mail__main-content-top-left-icon-refresh"></i>
        <i className="fa-solid fa-ellipsis-vertical mail__main-content-top-left-icon"></i>
       </div>

       {isDropdownOpen && (
        <ul className="mail__main-content-top-left-select-down-menu">
         <li onClick={() => handleOptionSelect('all')}>All</li>
         <li onClick={() => handleOptionSelect('none')}>None</li>
         <li onClick={() => handleOptionSelect('read')}>Read</li>
         <li onClick={() => handleOptionSelect('unread')}>Unread</li>
         <li onClick={() => handleOptionSelect('starred')}>Starred</li>
         <li onClick={() => handleOptionSelect('unstarred')}>Unstarred</li>
        </ul>
       )}

       <div className="mail__main-content-top-right" style={{ display: visibleMailsCount > 0 ? 'flex' : 'none' }}>
        <span className="mail__main-content-top-right-number">1-{visibleMailsCount} of {visibleMailsCount}</span>
        <i className="fa-solid fa-angle-left mail__main-content-top-right-angle"></i>
        <i className="fa-solid fa-angle-right mail__main-content-top-right-angle"></i>
       </div>
      </div>

      {(activeTab === 'primary' || activeTab === 'promotions' || activeTab === 'social') && (
       <div className="mail__main-content-tab">
        <button className={`mail__main-content-tab-primary ${activeTab === 'primary' ? 'active' : ''}`} 
         onClick={() => setActiveTab('primary')} 
         style={activeTab === 'primary' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}>

         <i className={`fa-solid fa-inbox mail__main-content-tab-primary-pr`}
          style={activeTab === 'primary' ? { color: '#2f80ed' } : {}}>
         </i>

         <span className={`mail__main-content-tab-primary-text`}
          style={activeTab === 'primary' ? {  color: '#2f80ed' } : {}}>Primary
         </span>
        </button>

        <button className={`mail__main-content-tab-promotions ${activeTab === 'promotions' ? 'active' : ''}`} 
         onClick={() => setActiveTab('promotions')} 
         style={activeTab === 'promotions' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}>

         <i className={`fa-solid fa-tag fa-lg mail__main-content-tab-primary-icon`}
          style={activeTab === 'promotions' ? { color: '#2f80ed' } : {}}>
         </i>

         <span className={`mail__main-content-tab-primary-text`}
          style={activeTab === 'promotions' ? { color: '#2f80ed' } : {}}>Promotions</span>
        </button>

        <button className={`mail__main-content-tab-social ${activeTab === 'social' ? 'active' : ''}`} 
         onClick={() => setActiveTab('social')} 
         style={activeTab === 'social' ? { borderBottom: '2px solid #2f80ed', color: '#2f80ed' } : {}}>

         <i className={`fa-solid fa-user-group fa-sm mail__main-content-tab-primary-icon`}
          style={activeTab === 'social' ? { color: '#2f80ed' } : {}}>
         </i>
       
         <span className={`mail__main-content-tab-primary-text`}
          style={activeTab === 'social' ? { color: '#2f80ed' } : {}}>Social
         </span>
        </button>
       </div>
      )}
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

          <input type="checkbox" className="mail__main-content-list-item-checkbox" checked={selectedMails.includes(mail.id)}
           onClick={(e) => {
            e.stopPropagation(); 
            handleCheckboxClick(e, mail.id);
           }} 
           onChange={(e) => {}}
          />

          {activeTab === 'bin' ? (
           <i className="fa-regular fa-trash-can" onClick={(e) => { e.stopPropagation(); deleteMail(mail.id); }}></i>
           ) : (
           <i className={`mail__main-content-list-item-star ${mail.isStarred ? 'fa-solid fa-star fa-2xs' : 'fa-regular fa-star fa-2xs'}`}
            style={{ color: mail.isStarred ? '#FFD43B' : 'inherit' }} 
            onClick={(e) => {e.stopPropagation();  handleStarClick(mail.id); }}></i>
          )}

          <span className="mail__main-content-list-item-sender">{mail.sender}</span>
          <div className="mail__main-content-list-item-middle">
           <span className="mail__main-content-list-item-subject">{mail.subject} - </span>
           <span className="mail__main-content-list-item-description">{mail.description}</span>
          </div>
         
          <div className="mail__main-content-list-item-space"></div>
          <span className="mail__main-content-list-item-date">{formatDate(mail.date)}</span>
          <div className="mail__main-content-list-item-left">
           <i className="fa-solid fa-grip-vertical fa-xs mail__main-content-list-item-left-icon"
            onDragStart={() => handleDragStart(mail.id)}>
           </i>
          </div>

          <div className="mail__main-content-list-item-icons">
           <i className={`fa-solid fa-box-archive mail__main-content-list-item-icons-icon ${activeTab === 'bin' ? 'disabled' : ''}`} 
            onClick={(e) => { if (activeTab !== 'bin') { e.stopPropagation(); }}}>
           </i>

           <i className={`fa-regular fa-trash-can mail__main-content-list-item-icons-icon ${activeTab === 'bin' ? 'disabled' : ''}`} 
            onClick={(e) => { if (activeTab !== 'bin') { e.stopPropagation(); deleteMail(mail.id); }}}>
           </i>

           <i className={`mail__main-content-list-item-icons-icon ${mail.isRead ? 'fa-regular fa-envelope' : 'fa-solid fa-envelope-open'}`}
            onClick={(e) => { e.stopPropagation(); handleToggleRead(mail.id); }}>
           </i>

           <i className="fa-regular fa-clock mail__main-content-list-item-icons-icon"></i>
          </div>
         </div>
        ) : null
       ))}
      </div>
     )}

     {isPopupOpen && (
      <div className={`mail__main-sidebar-compose-popup ${isPopupMinimized ? 'minimized' : ''}`}>
       <div className="mail__main-sidebar-compose-popup-header">
        <span className="mail__main-sidebar-compose-popup-header-text">New Message</span>
        <div className="mail__main-sidebar-compose-popup-header-right">
         <button className="fa-solid fa-minus mail__main-sidebar-compose-popup-header-button-down" onClick={toggleMinimizePopup}></button>
         <button className="mail__main-sidebar-compose-popup-header-button-close" onClick={closeComposePopup}>X</button>
        </div>
       </div>
          
       {!isPopupMinimized && (
        <div className="mail__main-sidebar-compose-popup-body">
         <div className="mail__main-sidebar-compose-popup-body-from">
          <label className="mail__main-sidebar-compose-popup-body-from-text">From John Doe &lt;supercoolman@gmail.com&gt;</label>
          {/* <input className="mail__main-sidebar-compose-popup-body-from-input" type="text" placeholder="sender"/> */}
         </div>

         <div className="mail__main-sidebar-compose-popup-body-to">
          <label className="mail__main-sidebar-compose-popup-body-to-text">To</label>
          <input className="mail__main-sidebar-compose-popup-body-to-input"
           type="text"
           placeholder="who"
           value={toValue}
           onChange={(e) => setToValue(e.target.value)}
          />
         </div>
            
         <div className="mail__main-sidebar-compose-popup-body-subject">
          <label className="mail__main-sidebar-compose-popup-body-subject-text"></label>
          <input className="mail__main-sidebar-compose-popup-body-subject-input"
           type="text"
           placeholder="Subject"
           value={subjectValue}
           onChange={(e) => setSubjectValue(e.target.value)}
          />
         </div>

         <div className="mail__main-sidebar-compose-popup-body-text">
          <textarea className="mail__main-sidebar-compose-popup-body-text-inside"
           placeholder=""
           value={descriptionValue}
           onChange={(e) => setDescriptionValue(e.target.value)}>
          </textarea>
         </div>
        

         <div className="mail__main-sidebar-compose-popup-footer">
          <div className="mail__main-sidebar-compose-popup-footer-button" onClick={handleSend}>
           <span  className="mail__main-sidebar-compose-popup-footer-button-text">Send</span>
           <button className="fa-solid fa-caret-down fa-xs mail__main-sidebar-compose-popup-footer-button-icon"></button>
          </div>

          {isMissingRecipient && (
           <div className="mail__main-sidebar-side-down-overlay">
            <div className="mail__main-sidebar-compose-popup-footer-button-form" ref={missingRecipientRef}>
             <h3>Error</h3>
             <p>Please specify at least one recipient.</p>
             <button onClick={closeMissingRecipientForm}>OK</button>
            </div>
           </div>
          )}

          <div className="mail__main-sidebar-compose-popup-footer-icons">
           <i className="fa fa-paperclip fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa fa-image fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa fa-smile fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa-brands fa-google-drive fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa-regular fa-image fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa-solid fa-lock fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa-solid fa-pen fa-xs mail__main-sidebar-compose-popup-footer-icons-icon"></i>
           <i className="fa-solid fa-ellipsis-vertical fa-xs mail__main-sidebar-compose-popup-footer-icons-icon--left" onClick={toggleOptionsMenu}></i>
           <i className="fa-solid fa-trash-can fa-xs mail__main-sidebar-compose-popup-footer-icons-icon--right" onClick={closeComposePopup}></i>
          
           {isOptionsMenuOpen && (
            <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options" ref={optionsMenuRef}>
             <ul>
              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-bottom">Default to full screen</li>
              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret"
               onMouseOver={showCaretTooltip}
               onMouseOut={hideCaretTooltip}>Label

               {isCaretTooltipVisible && (
                <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip">
                 <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-header">
                  <span>Label as:</span>
                 </div>

                 <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-search">
                  <input
                   type="text"
                   placeholder=""
                   />
                   
                  <i className="fa fa-search"></i>
                 </div>
      
                 <ul className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-options">
                  <li><input type="checkbox" /> Notes</li>
                  <li><input type="checkbox" /> Social</li>
                  <li><input type="checkbox" /> Updates</li>
                  <li><input type="checkbox" /> Forums</li>
                  <li><input type="checkbox" /> Promotions</li>
                 </ul>

                 <hr/>
                 <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-footer">
                  <div className="fa-regular fa-star mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-footer-star">
                    <span>Add star</span>
                  </div>

                  <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-footer-text">Create new</div>
                  <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-tooltip-footer-text">Manage labels</div>
                 </div>
                </div>
               )}
               <i className="fa-solid fa-caret-right"></i>
              </li>

              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-bottom">Plain text mode</li>
              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-li">Print</li>
              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-bottom">Check spelling</li>
              <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-down"
               onMouseOver={showDownTooltip}
               onMouseOut={hideDownTooltip}>

               {isDownTooltipVisible && (
                <div className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-down">
                 <ul>
                  <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-down-li">Offer times you're free</li>
                  <li className="mail__main-sidebar-compose-popup-footer-icons-icon-options-caret-down-li">Create an event</li>
                 </ul>
                </div>
               )}

               <i className="fa-solid fa-calendar mail__main-sidebar-compose-popup-footer-icons-icon-options-icon"></i>
               <span className="mail__main-sidebar-compose-popup-footer-icons-icon-options-text">Set up a time to meet</span>
               <span className="mail__main-sidebar-compose-popup-footer-icons-icon-options-dot"></span>
                <i className="fa-solid fa-caret-right"></i>
              </li>
             </ul>
            </div>
           )}
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
        {activeTab === 'bin' ? (
        <>
         <div className="mail__main-content-detail-top-bin">
          <span className="mail__main-content-detail-top-bin-delete"
           onClick={(e) => { setIsMailView(false); e.stopPropagation(); deleteMail(selectedMail.id); }}>Delete Forever
          </span>

          <span className="mail__main-content-detail-top-bin-divider"></span>
          <div className="mail__main-content-detail-top-bin-icons">
           <i className="fa-solid fa-circle-exclamation"></i>
           <i className="fa-regular fa-envelope"></i>
           <i className="fa-regular fa-folder"></i>
           <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
         </div>
        </>
        ) : (
        <>
         <div className="mail__main-content-detail-top-first">
          <i className="fa-regular fa-folder-open"></i>
          <i className="fa-solid fa-circle-exclamation"></i>
          <i className="fa-regular fa-trash-can"
           onClick={() => {setIsMailView(false); deleteMail(selectedMail.id); }}>
          </i>
         </div>

         <div className="mail__main-content-detail-top-second">
          <i className="fa-regular fa-envelope" onClick={(e) => { e.stopPropagation(); handleToggleRead(selectedMail.id); setIsMailView(false)}}></i>
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
        </>
        )}
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
          <span className="mail__main-content-detail-subject-date">{formatDate(selectedMail.date, true, selectedMail.time)}</span>
          <i className={`mail__main-content-detail-subject-star ${selectedMail?.isStarred ? 'fa-solid fa-star fa-2xs' : 'fa-regular fa-star fa-2xs'}`}
           style={{ color: selectedMail?.isStarred ? '#FFD43B' : 'inherit' }}
           onClick={(e) => {
            e.stopPropagation();
            handleStarClick(selectedMail.id);
           }}>
          </i>

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
     <div className="mail__main-right-pic">
      <img src="images/calendar-icon.png" alt="Calendar"/>
     </div>

     <div className="mail__main-right-pic">
      <img src="images/note-icon.png" alt="Note"/>
     </div>

     <i className="fa-solid fa-user mail__main-right-person"></i>
     <hr className="mail__main-right-divider"/>
     <i className="fa-solid fa-plus mail__main-right-icon"></i>
    </div>
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