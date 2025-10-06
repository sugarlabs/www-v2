import styled from 'styled-components';
import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #26c6da; /* sky-teal for light mode */
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: #fff176; /* yellowish sun knob */
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #0d47a1; /* dark blue for dark mode */
  }

  input:checked + .slider:before {
    transform: translateX(22px);
    background-color: #90caf9; /* moon knob in light blue */
  }
`;

export default Switch;
