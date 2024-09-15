import './index.css';
import { useState } from "react";

function App() {

    const charPerLine = 74;
    const [laravelComment, setLaravelComment] = useState('');

    function getSequence(charCount, lineCount = 2, maxValue = 77) {

        if (lineCount > 10) {
            throw new Error('Much more lines than required');
        }

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
            <label>Add Comment</label>
            <br/>
            <textarea
                onChange={e => handleChange(e.target.value)}
                cols={120}
                rows={5}
            />
            <hr/>
            Laravel styled comment
            <br/>
            <textarea
                readOnly
                defaultValue={laravelComment}
                cols={120}
                rows={5}
            />
        </div>
    );
}

export default App;
