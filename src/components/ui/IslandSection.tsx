import React, { useState, useCallback, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppstore';
import '../../styles/floating-button.css';

interface Island {
  id: number;
  name: string;
  section: string;
  order: number;
  position: { x: number; y: number };
  path: string;
}

const IslandSection = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showCompleteBridge, setShowCompleteBridge] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const {
    pacificIslands,
    setActiveIsland,
    addConnectedIsland
  } = useAppStore();

  // 모바일 감지 훅
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const islands: Island[] = [
    {
      id: 1,
      name: 'Foundations',
      section: 'foundations',
      order: 0,
      position: { x: 25, y: 25 },
      path: 'M20,21 C23,18 29,17 32,21 C35,23 36,29 34,33 C31,37 25,39 22,36 C19,33 18,27 20,21Z'
    },
    {
      id: 2,
      name: 'Infrastructure',
      section: 'infrastructure',
      order: 1,
      position: { x: 75, y: 25 },
      path: 'M70,22 C73,19 79,18 82,23 C85,26 85,32 82,36 C78,39 72,40 68,37 C65,33 66,27 70,22Z'
    },
    {
      id: 3,
      name: 'Skills',
      section: 'skills',
      order: 2,
      position: { x: 75, y: 75 },
      path: 'M70,70 C73,68 78,66 81,70 C84,74 83,80 79,84 C74,88 69,88 67,83 C65,78 67,72 70,70Z'
    },
    {
      id: 4,
      name: 'Communities',
      section: 'communities',
      order: 3,
      position: { x: 25, y: 75 },
      path: 'M20,71 C23,68 29,67 31,72 C34,76 33,82 29,85 C26,88 20,89 18,83 C17,77 18,72 20,71Z'
    }
  ];

  // 완성 다리 지연 애니메이션 관리
  useEffect(() => {
    if (pacificIslands.connectedIslands.length === 4) {
      const timer = setTimeout(() => {
        setShowCompleteBridge(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setShowCompleteBridge(false);
    }
  }, [pacificIslands.connectedIslands.length]);

  const getNextAllowedIsland = (): string | null => {
    const connectedCount = pacificIslands.connectedIslands.length;
    if (connectedCount >= islands.length) return null;
    
    const nextIsland = islands.find(island => island.order === connectedCount);
    return nextIsland?.section || null;
  };

  const getNextAllowedIslandName = (): string | null => {
    const nextSection = getNextAllowedIsland();
    if (!nextSection) return null;
    
    const nextIsland = islands.find(island => island.section === nextSection);
    return nextIsland?.name || null;
  };

  const isIslandClickable = (island: Island): boolean => {
    const connectedCount = pacificIslands.connectedIslands.length;
    const isAlreadyVisited = pacificIslands.connectedIslands.includes(island.section);
    
    if (isAlreadyVisited) return true;
    return island.order === connectedCount;
  };

  const handleIslandClick = useCallback((island: Island) => {
    if (!isIslandClickable(island)) {
      return;
    }

    if (!pacificIslands.connectedIslands.includes(island.section)) {
      addConnectedIsland(island.section);
    }
    
    setActiveIsland(island.section);
    
    const element = document.getElementById(island.section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pacificIslands.connectedIslands, addConnectedIsland, setActiveIsland]);

  const toggleWidget = (): void => {
    setIsExpanded(!isExpanded);
  };

  const closeWidget = (e?: React.MouseEvent): void => {
    if (e) e.stopPropagation();
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isExpanded]);

  const createArchPath = (start: { x: number; y: number }, end: { x: number; y: number }): string => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2 - 8;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const renderBridges = () => {
    const connected = pacificIslands.connectedIslands;
    const bridges: React.ReactElement[] = [];

    for (let i = 0; i < connected.length - 1; i++) {
      const current = islands.find(island => island.section === connected[i]);
      const next = islands.find(island => island.section === connected[i + 1]);
      
      if (!current || !next || !current.position || !next.position) {
        continue;
      }

      bridges.push(
        <path
          key={`arch-${i}`}
          d={createArchPath(current.position, next.position)}
          className="static-bridge"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    }

    if (connected.length === 4 && showCompleteBridge) {
      const last = islands.find(island => island.section === connected[3]);
      const first = islands.find(island => island.section === connected[0]);
      
      if (last && first && last.position && first.position) {
        bridges.push(
          <path
            key="complete-arch"
            d={createArchPath(last.position, first.position)}
            className="complete-bridge-animated"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      }
    }

    return bridges;
  };

  const getIslandState = (island: Island): 'visited' | 'available' | 'locked' => {
    const isVisited = pacificIslands.connectedIslands.includes(island.section);
    const isClickable = isIslandClickable(island);
    
    if (isVisited) return 'visited';
    if (isClickable) return 'available';
    return 'locked';
  };

  // 공통 맵 컴포넌트
  const renderIslandMap = () => (
    <div className={`ocean-map ${isMobile ? 'mobile-only-map' : ''}`}>
      <svg viewBox="0 0 100 100" className="map-svg">
        <defs>
          <radialGradient id="lightOcean" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </radialGradient>
          
          <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          
          <linearGradient id="visitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
        </defs>
        
        <rect width="100" height="100" fill="url(#lightOcean)" />
        
        <g className="bridge-group-hybrid">
          {renderBridges()}
        </g>

        {islands.map((island) => {
          const islandState = getIslandState(island);
          return (
            <g key={island.id}>
              <path
                d={island.path}
                fill="rgba(0,0,0,0.2)"
                transform="translate(1,1)"
                style={{ pointerEvents: 'none' }}
              />
              
              <path
                d={island.path}
                className={`island-path ${islandState}`}
                onClick={() => handleIslandClick(island)}
                style={{ 
                  cursor: isIslandClickable(island) ? 'pointer' : 'not-allowed'
                }}
              />
              
              <text
                x={island.position.x}
                y={island.position.y + 16}
                textAnchor="middle"
                className="island-name-spaced"
              >
                {island.name}
              </text>
              
              {islandState === 'locked' && (
                <text
                  x={island.position.x}
                  y={island.position.y - 2}
                  textAnchor="middle"
                  className="lock-icon"
                  fontSize="6"
                  fill="#94a3b8"
                >
                  🔒
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* 모바일 전용 우측 상단 닫기 버튼 */}
      {isMobile && isExpanded && (
        <button 
          className="mobile-close-button" 
          onClick={closeWidget}
          aria-label="Close Navigator"
        >
          ×
        </button>
      )}
      
      {/* 모바일 전용 하단 진행도 */}
      {isMobile && isExpanded && (
        <div className="mobile-progress-overlay">
          <div className="progress-dots">
            {[1, 2, 3, 4].map(i => (
              <span 
                key={i} 
                className={`progress-dot ${i <= pacificIslands.connectedIslands.length ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="progress-info">
            <span className="progress-count">
              {pacificIslands.connectedIslands.length === 4 && showCompleteBridge ? 
                "🎉 Complete!" : 
                `${pacificIslands.connectedIslands.length}/4`
              }
            </span>
            {pacificIslands.connectedIslands.length < 4 && (
              <span className="next-hint">
                Next: {getNextAllowedIslandName()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`island-widget ${isExpanded ? 'widget-open' : 'widget-closed'}`}>
      {/* 축소된 상태 */}
      {!isExpanded && (
        <button className="widget-trigger-fixed" onClick={toggleWidget} aria-label="Open Pacific Navigator">
          🌺
        </button>
      )}

      {/* 확장된 상태 - 모바일과 데스크톱 분기 */}
      {isExpanded && (
        <>
          {isMobile ? (
            /* 모바일: 맵만 표시 */
            <div className="mobile-map-container">
              {renderIslandMap()}
            </div>
          ) : (
            /* 데스크톱: 기존 패널 구조 */
            <div className="widget-panel-fixed-size">
              <div className="panel-header">
                <span className="panel-title">Pacific Navigator</span>
                <button className="panel-close" onClick={closeWidget} aria-label="Close">
                  ×
                </button>
              </div>
              
              <div className="panel-body-fixed">
                {renderIslandMap()}

                <div className="progress-bar-fixed">
                  <div className="progress-dots">
                    {[1, 2, 3, 4].map(i => (
                      <span 
                        key={i} 
                        className={`progress-dot ${i <= pacificIslands.connectedIslands.length ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                  
                  <div className="progress-message-container">
                    <div className="progress-label">
                      {pacificIslands.connectedIslands.length === 4 && showCompleteBridge ? 
                        "🎉 Complete Network!" : 
                        `${pacificIslands.connectedIslands.length}/4 Islands`
                      }
                    </div>
                    
                    <div className="next-island-container">
                      {pacificIslands.connectedIslands.length < 4 && (
                        <div className="next-island-hint">
                          Next: {getNextAllowedIslandName()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IslandSection;