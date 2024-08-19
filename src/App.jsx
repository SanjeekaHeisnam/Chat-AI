import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("✨ Hang tight, your adventure is about to begin... ✨");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
      setQuestion(""); // Clear the question input after generating the answer
    } catch (error) {
      console.log(error);
      setAnswer("😔 Oops, something went wrong on this adventure. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
      >
        <a href="" target="_blank" rel="noopener noreferrer">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4 animate-pulse tracking-wider">
            ✨ ChatWander ✨
          </h1>
        </a>
        <textarea
          required
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-purple-400 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's your next adventure?"
        ></textarea>
        <button
          type="submit"
          className={`bg-gradient-to-r from-purple-400 to-pink-500 text-white p-3 rounded-md hover:from-pink-500 hover:to-purple-400 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? (
            <span className="animate-spin">🔮 Crafting Your Story...</span>
          ) : (
            "Start Your Adventure"
          )}
        </button>
      </form>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105 overflow-y-auto max-h-96 p-4 bg-gradient-to-r from-white to-gray-100">
        <ReactMarkdown className="prose prose-lg text-left text-gray-800">
          {answer}
        </ReactMarkdown>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">Made with ✨ magic ✨ by [Heisnam Sanjeeka Devi]</p>
      </div>
    </div>
  );
}

export default App;
