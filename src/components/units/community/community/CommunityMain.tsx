import React, { useEffect, useRef, useState } from 'react';
import * as S from './CommunityMain.style';
import { RiMessage3Fill } from 'react-icons/ri';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { getInfiniteDiaries } from 'src/apis/diary';
import CommunityEach from './CommunityEach';
import { getInfiniteCommunity } from 'src/apis/community';

// type MyEventHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

// interface CloudyProps {
//   hasCloudyArea?: boolean;
//   cloudyAreaBgColor?: string;
// }
// interface Props extends CloudyProps {
//   children: React.ReactNode;
// }
// 
const CommunityMain = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number | undefined>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const [ref, inView] = useInView();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data: viewAllData, //현재까지 로드된 데이터를 나타냅니다. 이 속성은 배열 형태로 각 페이지의 데이터를 가지고 있습니다.
    isLoading, //데이터를 가져오는 중인지 여부를 나타냅니다. true이면 데이터를 아직 받아오는 중이라는 뜻입니다.
    hasNextPage, //더 많은 페이지가 있는지 여부를 나타냅니다. true이면 다음 페이지가 존재한다는 뜻이며, 이 값을 사용하여 무한 스크롤을 구현할 수 있습니다.
    isError,
    isSuccess,
    fetchNextPage, //다음 페이지를 가져오기 위해 호출할 함수입니다. 이 함수를 호출하면 다음 페이지의 데이터를 가져옵니다.
  } = useInfiniteQuery(
    'getInfiniteCommunity',
    ({ pageParam = 1 }) => getInfiniteCommunity(pageParam),
    {
      //다음 페이지의 pageParam 값을 결정하는 데 사용
      getNextPageParam: (_lastPage) => {
        if (_lastPage?.isLast) {
          return _lastPage?.nextPage;
        } else {
          return null;
        }
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Loading failed...</div>;
  }
  if (isSuccess) {
    // console.log('data', viewAllData);
  }

  //사용할 이벤트
  //onMouseDown: 마우스 왼쪽 버튼 누르고 있는 상태
  //onMouseUp: 마우스 왼쪽 버튼 뗀 상태
  //onMouseMove : 마우스를 움직이는 상태 (클릭 하던 안 하던 상관없이)
  //onMouseLeave: dom에서 마우스가 벗어났는지 체크하는 이벤트

  //사용할 변수
  // DOM.scrollWidth: 스크롤 할 수 있는 총 길이
  // DOM.clientWidth: 설정한 max-width(화면에 보이는 스크롤의 길이)
  // DOM.scrollLeft: 스크롤 가장 왼쪽 부터 이동한 스크롤 길이,. DOM.scrollLeft만큼 스크롤 이동
  // mouseEvent.pageX : onMouseDown시 x좌표

  const onDragStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDrag(true);
    if (!scrollRef.current) return;
    console.log('1', e.pageX + scrollRef.current.scrollLeft);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
    //현재 클릭한 pageX의 길이 scrollLeft를 합친 값. 스크롤이 이동하지 않았을 떄는 문제가 없지만 스크롤이 이동된 상태에서 클릭을 한다면, 브라우저의 width의 pageX값이 설정이 돼 순간적으로 앞쪽으로 스크롤이 된다. 이를 막기 위해 scrollLeft를 더해 현재 x의 위치를 계산
  };

  const onDragEnd: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDrag(false);
    //onMouseUp, onMouseLeave 이벤트가 발생했을 때 isDrag를 false로 설정
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDrag && startX) {
      if (!scrollRef.current) return;
      console.log('2', startX - e.pageX);
      scrollRef.current.scrollLeft = startX - e.pageX;
    }

    // if (isDrag) {
    //   const scrollRefCurrent = scrollRef.current;

    //   if (scrollRefCurrent && startX) {
    //     const { scrollWidth, clientWidth, scrollLeft } = scrollRefCurrent;
    //     scrollRefCurrent.scrollLeft = startX - e.pageX;
    //     if (scrollLeft === 0) {
    //       setStartX(e.pageX); //가장 왼쪽일 때, 움직이고 있는 마우스의 x좌표가 곧 startX로 설정.
    //     } else if (scrollWidth <= clientWidth + scrollLeft) {
    //       setStartX(e.pageX + scrollLeft); //가장 오른쪽일 때, 움직이고 있는 마우스의 x좌표에 현재 스크롤된 길이 scrollLeft의 합으로 설정
    //     }
    //   }
    // }
  };

  const carousel = [
    '전체',
    '감정1',
    '감정2',
    '감정3',
    '감정4',
    '감정5',
    '감정6',
    '감정7',
    '감정8',
    '감정9',
  ];

  return (
    <S.MainContainer>
      <S.MainHeader>
        <S.MainFlexBoxDiv>
          <img alt='logo' src='/ninecloud.png' />
          <S.MainProfileFlexDiv>
            <img alt='감정이모티콘'></img>
            <img alt='profile' src='/avatar.png' />
          </S.MainProfileFlexDiv>
        </S.MainFlexBoxDiv>
      </S.MainHeader>
      <S.MainSectionContainer>
        <S.MainSectionHeaderWrapper>
          <S.MainFlexBox style={iconStyle}>
            <RiMessage3Fill />
            <S.MainProfileDiv>
              <S.MainHeaderContent>
                오늘의 채팅방을 <br />
                방문해보세요
              </S.MainHeaderContent>
              <S.MainHeaderOn></S.MainHeaderOn>
            </S.MainProfileDiv>
          </S.MainFlexBox>
        </S.MainSectionHeaderWrapper>
        <S.MainSlideBox>
          {/* 스타일드 컴포넌트를 사용하여 UI를 정의하고, 슬라이더의 위치를 offset에 따라 변화시킴 */}
          <S.MainSlideFlex
            onMouseDown={onDragStart}
            onMouseMove={onMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            ref={scrollRef}
          >
            {carousel.map((emotion, index) => {
              return (
                <S.MainEachSlideBox key={index}>
                  <div className='MainEachSlideEmojiBox'></div>
                  <p>{emotion}</p>
                </S.MainEachSlideBox>
              );
            })}
          </S.MainSlideFlex>
          <S.MainMapContainer>
            <div>
              {viewAllData?.pages.map((page, pageIndex) => {
                return page?.result.data.map((item: any, itemIndex: number) => {
                  return (
                    <CommunityEach
                      key={`page-${pageIndex}-item-${itemIndex}`}
                      item={item}
                    />
                  );
                });
              })}
            </div>
            <div ref={ref} style={{ color: 'transparent' }}>
              Loading...
            </div>
          </S.MainMapContainer>
        </S.MainSlideBox>
      </S.MainSectionContainer>
    </S.MainContainer>
  );
};

export default CommunityMain;

const iconStyle = {
  fontSize: '30px',
};
