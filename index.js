function toggleMailStatus(mailElement) {
  const isRead = mailElement.getAttribute("data-read") === "true";
  mailElement.setAttribute("data-read", !isRead);

  const isSelected = mailElement.getAttribute("data-selected") === "true";
  mailElement.setAttribute("data-selected", !isSelected);
}
