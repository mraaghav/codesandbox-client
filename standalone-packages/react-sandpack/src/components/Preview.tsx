import React, { useRef, useEffect } from 'react';
import { styled } from '../stitches.config';

import { useSandpack } from '../utils/sandpack-context';
import { Navigator } from './Navigator';

export interface PreviewProps {
  style?: React.CSSProperties;
  showNavigator?: boolean;
}

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$neutral1000',
});

const PreviewFrame = styled('div', {
  width: '100%',
  flex: 1,
});

export const Preview: React.FC<PreviewProps> = ({ style, showNavigator }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sandpack, listen } = useSandpack();

  // TODO: is this still needed?
  useEffect(() => {
    const unsub = listen((message: any) => {
      if (message.type === 'resize') {
        if (sandpack.browserFrame) {
          sandpack.browserFrame.style.height = message.height;
        }
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (!sandpack.browserFrame || !containerRef.current) {
      return;
    }

    const { browserFrame } = sandpack;
    browserFrame.style.width = '100%';
    browserFrame.style.height = '100%';
    browserFrame.style.visibility = 'visible';
    browserFrame.style.position = 'relative';

    containerRef.current.appendChild(browserFrame);
  }, [sandpack?.browserFrame]);

  return (
    <Wrapper style={style}>
      {showNavigator && <Navigator />}
      <PreviewFrame id="preview-frame" ref={containerRef} />
    </Wrapper>
  );
};
