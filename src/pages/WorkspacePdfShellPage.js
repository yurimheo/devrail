import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import WorkspaceHeader from '../components/WorkspaceHeader';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function WorkspacePdfShellPage() {
  const { workspace_id, course_id, fileName } = useParams();
  const location = useLocation();
  const pdfFiles = location.state?.pdfFiles || [];

  const pdfPath = `/pdfs/${workspace_id}/${course_id}/${fileName}`;
  const terminalRef = useRef(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (!terminalRef.current) {
      terminalRef.current = new Terminal();
      terminalRef.current.open(document.getElementById('terminal'));
      terminalRef.current.write('Welcome to DEVRAIL Terminal!\r\n');
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* 헤더 */}
      <WorkspaceHeader
        workspace_id={workspace_id}
        courseId={course_id}
        fileName={fileName}
        pdfFiles={pdfFiles}
      />

      {/* PDF 뷰어 & 터미널 화면 */}
      <div className="flex flex-1">
        {/* PDF 뷰어 */}
        <div className="w-1/2 p-6 border-r bg-gray-50 overflow-y-auto">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfPath} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>

        {/* 터미널 화면 */}
        <div className="w-1/2 p-6 bg-gray-900 text-white">
          <div id="terminal" className="h-full rounded-xl bg-black"></div>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-4">
        <p className="text-center">&copy; 2025 DevRail. All rights reserved.</p>
      </footer>
    </div>
  );
}
