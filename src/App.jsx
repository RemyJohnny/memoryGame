import { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import Card from "./components/Card";
import ScoreBoard from "./components/scoreBoard";

const shuffle = (arr) => {
  if (arr.length < 1) return [];
  return arr.sort(() => Math.random() - 0.5);
};

const check = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return true;
    }
  }
  return false;
};
let len = 0;
function App() {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [best, setBest] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    len = 0;
    setIsLoading(1);
    setError(false);
    async function getEmoji() {
      try {
        const rawResponse = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=BUx3AoB3Q0ktMp1ZrDE1nFwnE6aECNHB&q=horror&limit=8&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`,
          {
            mode: "cors",
          }
        );
        const Response = await rawResponse.json();
        setResponse(Response.data);
        setIsLoading(0);
      } catch (err) {
        setIsLoading(0);
        setError(true);
        console.log(err);
      }
    }
    getEmoji();
  }, [offset]);

  const updateBestScore = () => {
    if (clicked.length > best) {
      setBest(clicked.length);
    }
  };

  const onclick = (key) => {
    if (check(clicked, key)) {
      updateBestScore();
      setClicked([]);
      setOffset(0);
      len = 0;
      return;
    }
    len++;
    if (len === response.length) {
      setOffset(offset + 8);
    }

    setClicked([...clicked, key]);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="  text-3xl text-center font-extrabold"> MEMORY GAME </h1>
      <div>
        <ScoreBoard score={clicked.length} best={best} />
      </div>
      <div className=" flex gap-8 m-4 flex-wrap items-center justify-center max-w-5xl">
        {error ? (
          <div>{"OOPs something went wrong"}</div>
        ) : isLoading ? (
          <div className="mt-12">
            <BounceLoader color="#36d7b7" />
          </div>
        ) : (
          shuffle(response).map((item) => {
            return <Card card={item} key={item.id} onclick={onclick} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
