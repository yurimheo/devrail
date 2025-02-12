import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { courses } from '../data/courses';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PracticeHeader from '../components/PracticeHeader';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export default function PracticeShellPage() {
  const { subject_id, subject_course_id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === subject_id);
  const currentDay = course?.outline.find(
    (o) => o.day === parseInt(subject_course_id, 10),
  );

  const [markdownSections, setMarkdownSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const terminalRef = useRef(null);
  const [instanceCreated, setInstanceCreated] = useState(false);
  const [instanceIP, setInstanceIP] = useState('');
  const [instanceId, setInstanceId] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (currentDay) {
      const markdownPath = `/markdowns/${subject_id}/day${currentDay.day}.md`;
      fetch(markdownPath)
        .then((res) => res.text())
        .then((data) => {
          const sections = data.split('---');
          setMarkdownSections(sections);
          setCurrentPage(0);
        })
        .catch(() => setMarkdownSections(['# 파일을 찾을 수 없습니다.']));
    }
  }, [subject_id, subject_course_id, currentDay]);

  useEffect(() => {
    if (!terminalRef.current) {
      terminalRef.current = new Terminal();
      terminalRef.current.open(document.getElementById('terminal'));
      terminalRef.current.write('Welcome to DEVRAIL Terminal!\r\n');
    }
  }, []);

  useEffect(() => {
    const createInstance = async () => {
      try {
        const response = await fetch(`${API_URL}/practice/create-instance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'testUserId', // 실제 사용자 ID로 변경 필요
            courseId: subject_id,
            subjectId: currentDay?.subjectId,
            day: currentDay?.day
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setInstanceCreated(true);
            setInstanceIP(data.externalIP);
            setInstanceId(data.instanceId);
            
            // Socket.IO 연결 설정
            const socket = io(SOCKET_URL);
            socketRef.current = socket;

            socket.on('connect', () => {
              console.log('Socket.IO 연결됨');
              socket.emit('join', data.instanceId);
            });

            socket.on('instanceCreated', (instanceData) => {
              console.log('인스턴스 생성 완료:', instanceData);
              // 필요한 경우 추가 처리
            });

            socket.on('terminalOutput', (output) => {
              terminalRef.current.write(output);
            });

            socket.on('disconnect', () => {
              console.log('Socket.IO 연결 해제됨');
            });
          }
        } else {
          console.error("Instance creation failed with status:", response.status);
        }
      } catch (error) {
        console.error("Instance creation failed", error);
      }
    };

    createInstance();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currentDay, subject_id]);

  return (
    <div className="practice-shell-container">
      <PracticeHeader course={course} currentDay={currentDay} />
      {instanceCreated && (
        <div>
          <h2>실습 인스턴스 생성 완료!</h2>
          <p>접속 IP: {instanceIP}</p>
        </div>
      )}
      <div id="terminal"></div>
      <div className="markdown-section">
        <ReactMarkdown children={markdownSections[currentPage]} remarkPlugins={[remarkGfm]} />
      </div>
      <div className="navigation-buttons">
        <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0}>
          이전
        </button>
        <button onClick={() => setCurrentPage(Math.min(markdownSections.length - 1, currentPage + 1))} disabled={currentPage === markdownSections.length - 1}>
          다음
        </button>
      </div>
    </div>
  );
}