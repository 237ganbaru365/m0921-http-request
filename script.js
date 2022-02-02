const listElement = document.querySelector(".posts");
const postSection = document.querySelector("#single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHTTPRequest(method, url, data) {
  const response = fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    return result.json();
  });

  return response;
}

async function fetchPosts() {
  try {
    const responseData = await sendHTTPRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    for (const post of responseData) {
      const postElClone = document.importNode(postSection.content, true);
      postElClone.querySelector("h2").textContent = post.title;
      postElClone.querySelector("p").textContent = post.body;
      postElClone.querySelector("li").id = post.id;
      listElement.appendChild(postElClone);
    }
  } catch (error) {
    console.log(error);
  }
}

async function createPost(title, content) {
  const post = {
    userId: Math.random(),
    title,
    content,
  };
  const result = await sendHTTPRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  console.log(result);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector("#title").value;
  const enteredContent = e.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    console.log(e.tartet.closest("li"));
    const postToDelete = e.tartet.closest("li");

    const result = await sendHTTPRequest(
      "DELETE",
      "https://jsonplaceholder.typicode.com/posts/" + postToDelete.id
    );

    this.removeChild(postToDelete);
  }
});
