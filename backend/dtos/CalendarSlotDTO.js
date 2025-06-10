class CalendarSlotDTO {
  constructor(slot) {
    this.id = slot._id;
    this.group = slot.group;
    this.date = slot.date;
    this.description = slot.description;
  }
}

module.exports = CalendarSlotDTO; 