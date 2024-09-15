import './index.css';
import { useState } from "react";

function App() {

    const charPerLine = 74;
    const [laravelComment, setLaravelComment] = useState('');

    function getSequence(charCount, lineCount = 2, maxValue = 77) {

        charCount += (lineCount - 1) * 5;

        let difference = 5;
        let sequence = [];

        let equalDistribution = Math.ceil(charCount / lineCount);

        if (equalDistribution > maxValue) {
            return getSequence(charCount, lineCount + 1, maxValue);
        }

        let highestSequence = (Math.floor(lineCount / 2) * difference) + equalDistribution;

        if (highestSequence > maxValue) {
            return getSequence(charCount, lineCount++, maxValue);
        }

        sequence.push(highestSequence);

        let lastSequence = highestSequence;
        for (let i = 1; i < lineCount; i++) {
            const newSequence = lastSequence - difference;
            sequence.push(newSequence);

            lastSequence = newSequence;
        }

        return sequence;
    }

    const handleChange = (text) => {
        text = text.trim();
        // Get the length of the text
        const textLength = text.length;

        if (textLength < charPerLine) {
            setLaravelComment(text);

            return;
        }

        console.log(getSequence(textLength));

        let sequence = getSequence(textLength);

        // Split the text into words
        const words = text.split(' ');

        let comment = '';

        let line = '';

        let lineCount = 0;

        words.forEach((word) => {

            if (line.length + word.length > sequence[lineCount]) {
                comment += line + '\n';
                line = '// ';
                lineCount++;
            }

            line += word + ' ';
        })

        comment += line;

        setLaravelComment(comment);
    }

    return (
        <div>
            <h1 className="text-4xl my-9 text-center font-bold">Laravel Comments Generator</h1>
            <div id="description" className="text-center">
                <div className="mb-9 italic">
                    A Laravel styled comment generator<br />
                    Made by the Artisans, for the Artisans
                </div>
                <div class="bg-blue-300 rounded-lg w-fit mx-auto px-4 py-3 mb-9">
                    <p>
                        This is an  (ongoing) effort to make our comments as beautiful as what <br />
                        the OG Taylor Otwell writes on Laravel framework.
                    </p>
                    <p className="py-3">
                        It is not a perfect solution, but together we can make it<br />
                        Do contribute at the <a className="underline" href='https://github.com/akshit-arora/laravel-styled-comments.github.io'>Github repo</a>
                    </p>
                </div>
            </div>
            <div id="generator">
                <div id="comment-input">
                    <label>
                        Write your comments here. (Please write it in the single line and start with //)
                    </label>
                    <textarea
                        className="w-full h-40 border-2 border-black rounded-lg font-code"
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>
                <div id="comment-output" className="mt-4">
                    <label className="mt-4">
                        Copy the Laravel styled comment
                    </label>
                    <textarea
                        className="w-full h-40 border-2 border-black rounded-lg font-code"
                        readOnly
                        defaultValue={laravelComment}
                    />
                </div>
            </div>
            <div id="roadmap">
                <h1 className="text-3xl my-9 font-bold">Roadmap</h1>
                <p className="mb-4">
                    This tool of course has many things to do. I am making it open source so that each
                    on of us can contribute and make the tool better. I am thinking of the following updates.
                    Please feel free to suggest more of the updates you would like to see in the tool.
                </p>
                <ul className="list-decimal list-inside">
                    <li>
                        As Caleb said on his <a target="_blank" className="text-blue-500 underline"
                            href="https://www.youtube.com/watch?v=31pBMi0UdYE">Laracon US 2024 speech</a>, we, the devs
                        suck at designing. So foremost thing: Need to make it beautiful.
                    </li>
                    <li>
                        Add a <code className="bg-gray-200 border-slate-600 text-gray-600 rounded-sm px-1">Copy</code> button to copy the generated
                        comment
                    </li>
                    <li>
                        Select the type of comment (<code>// </code>, <code> /* */</code> or <code>| </code>) for
                        multiple lines
                    </li>
                    <li>
                        The generator still gets buggy at times when it adds a new line in the comment.
                    </li>
                    <li>
                        Set the variable max-char-per-line
                    </li>
                </ul>
            </div>
            <div id="footer" className="text-center mt-9 border-t-gray-700 border-t-2">
                <p className="pt-9">Made with <span className="text-red-500">❤️</span> by the Artisans</p>
                <p><span className="text-yellow-400">⭐</span> Star us on <a target="_blank" className="underline" href="https://github.com/akshit-arora/laravel-styled-comments.github.io">Github</a></p>
                <p className="pb-9">Follow the conversation on <a target="_blank" className="underline" href="https://x.com/akshitarora0907">X (Formerly Twitter)</a></p>
            </div>
        </div>
    );
}

export default App;
