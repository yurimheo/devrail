import React from 'react';
import Select from 'react-select';
import { FiSearch } from 'react-icons/fi'; // 📟 검색 아이콘 추가

// 📦 CustomDropdown 컴포넌트
export default function CustomDropdown({
  workspace_id,
  courseId,
  pdfFiles,
  selectedFile,
  onFileChange,
}) {
  // 💠 PDF 옵션 리스트 생성
  const options = pdfFiles.map((pdf) => ({
    value: pdf.replace('.pdf', ''),
    label: pdf.replace('.pdf', ''),
  }));

  // 🔽 드롭다운 렌더링 🔽
  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedFile)}
      onChange={(selectedOption) => onFileChange(selectedOption.value)}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        // 📃 드롭다운 컨트롤 스타일
        control: (provided) => ({
          ...provided,
          backgroundColor: '#1e2a47', // - 배경색 설정
          borderColor: '#4b6cb7', // - 테두리 색상 설정
          color: 'white',
          borderRadius: '8px', // - 라운드 처리
          padding: '8px 12px',
          boxShadow: 'none',
          minHeight: '40px',
          zIndex: 10,
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
        }),
        // 📃 옵션 리스트 스타일
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#4b6cb7' : 'transparent', // - 선택 여부에 따른 배경색
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#3b4b7a',
          },
        }),
        // 📃 메뉴 스타일
        menu: (provided) => ({
          ...provided,
          backgroundColor: '#1e2a47',
          borderRadius: '8px',
          zIndex: 20,
          marginTop: '5px',
        }),
        // 📃 선택된 값 스타일
        singleValue: (provided) => ({
          ...provided,
          color: 'white',
        }),
        // 📃 구분선 제거
        indicatorSeparator: () => ({
          display: 'none',
        }),
        // 📃 드롭다운 화살표 아이콘 스타일
        dropdownIndicator: (provided) => ({
          ...provided,
          color: 'white', // - 화살표 색상
        }),
        // 📃 입력 필드 스타일
        input: (provided) => ({
          ...provided,
          color: 'white',
          outline: 'none',
          boxShadow: 'none',
        }),
        // 📃 포커스 시 스타일
        focused: (provided) => ({
          ...provided,
          outline: 'none',
          boxShadow: 'none',
        }),
      }}
      // 📃 커스텀 드롭다운 아이콘 구성
      components={{
        DropdownIndicator: () => (
          <FiSearch style={{ color: 'white', marginLeft: '10px' }} /> // 🔍 검색 아이콘
        ),
      }}
    />
  );
  // 🔼 드롭다운 렌더링 종료 🔼
}
