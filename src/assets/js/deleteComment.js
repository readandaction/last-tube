import axios from "axios";
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const deleteBtns = document.querySelectorAll(".jsDeleteCommentBtns");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};
const deleteComment = (commentId) => {
  const deleteBtn = document.getElementById(commentId);
  const li = deleteBtn.parentNode;
  li.remove();
  decreaseNumber();
};
const postCommentId = async (event) => {
  const commentId = event.target.id;
  const response = await axios({
    url: `/api/${commentId}/delete-comment`,
    method: "POST",
  });
  if (response.status === 200) {
    deleteComment(commentId);
  }
};

function init() {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", postCommentId);
  });
}

if (commentList) {
  init();
}
