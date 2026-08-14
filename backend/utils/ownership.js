const isOwnerMatch = (ownerId, userId) => {
  if (!ownerId || !userId) return false;
  return ownerId.toString() === userId.toString();
};

module.exports = {
  isOwnerMatch,
};