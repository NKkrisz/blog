import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export function Story({setStory, uploaded}) {
  const [html, setHtml] = useState('aaa');

  return (
    <Editor value={html} onChange={(e)=>setHtml(e.target.value)} onBlur={()=>setStory(html)} />
  );
}