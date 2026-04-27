import React, { useState, useRef, useEffect } from "react";
import styles from './Dashboard.module.css';
import Header from '../../components/Header';
import DateTime from '../../components/DateTime';


const Dashboard = () => {
  const statsData = {
    completed: 65,
    inProgress: 25,
    notStarted: 10
  };

  const progressData = [
    { label: 'DSA', value: 75, level: 'high' },
    { label: 'System Design', value: 45, level: 'medium' },
    { label: 'Aptitude', value: 90, level: 'high' },
    { label: 'Core Subjects', value: 60, level: 'medium' }
  ];

  const graphData = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 65 },
    { day: 'Sun', value: 55 }
  ];

  const getProgressClass = (value) => {
    if (value >= 90) return styles.w90;
    if (value >= 80) return styles.w80;
    if (value >= 75) return styles.w75;
    if (value >= 70) return styles.w70;
    if (value >= 65) return styles.w65;
    if (value >= 60) return styles.w60;
    if (value >= 55) return styles.w55;
    if (value >= 50) return styles.w50;
    if (value >= 45) return styles.w45;
    if (value >= 40) return styles.w40;
    if (value >= 35) return styles.w35;
    if (value >= 30) return styles.w30;
    return styles.w25;
  };

  const getBarHeightClass = (value) => {
    if (value >= 80) return styles.h80;
    if (value >= 65) return styles.h65;
    if (value >= 60) return styles.h60;
    if (value >= 55) return styles.h55;
    if (value >= 45) return styles.h45;
    if (value >= 40) return styles.h40;
    if (value >= 30) return styles.h30;
    return styles.h20;
  };

  const getLevelClass = (level) => {
    if (level === 'high') return styles.levelHigh;
    if (level === 'medium') return styles.levelMedium;
    return styles.levelLow;
  };

  return (
      <div className={styles.dashboard}>
        {/* header fetched from adhip halder */}
        <Header />
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.mainTitle}>
              <span className={styles.titleGradient}>Dashboard </span>
              <span className={styles.titleGradientforOverview}>Overview</span>
            </h1>
            <p className={styles.subtitle}>Track your learning journey and progress</p>
            <div className={styles.dateCardWrapper}>
              <div className={styles.dateCard}>
                <div className={styles.dateIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className={styles.dateText}>
                  <span className={styles.dateLabel}>Today</span>
                  <span className={styles.dateValue}><DateTime /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerDecor}>
          <div className={styles.decorLine}></div>
          <div className={styles.decorDiamond}></div>
          <div className={styles.decorLine}></div>
        </div>
      </header>

      {/* Stats Section Title */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
        </div>
        <h2 className={styles.sectionTitle}>Analytics & Statistics</h2>
        <div className={styles.sectionLine}></div>
      </div>

      {/* Stats Section - 3 Boxes */}
      <div className={styles.statsSection}>
        {/* Box 1: Pie Chart Stats */}
        <div className={`${styles.box} ${styles.pieBox}`}>
          <div className={styles.boxGlow}></div>
          <div className={styles.boxContent}>
            <div className={styles.boxHeader}>
              <div className={styles.boxIconWrapper}>
                <div className={styles.boxIconBg}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                </div>
              </div>
              <div className={styles.boxTitleGroup}>
                <h3 className={styles.boxTitle}>Overall Stats</h3>
                <span className={styles.boxSubtitle}>Performance overview</span>
              </div>
              <div className={styles.boxBadge}>
                <span className={styles.badgeDot}></span>
                Live
              </div>
            </div>

            <div className={styles.pieChartContainer}>
              <div className={styles.pieChartWrapper}>
                <div className={styles.pieChartOuter}>
                  <svg viewBox="0 0 100 100" className={styles.pieChartSvg}>
                    {/* Definitions for gradients */}
                    <defs>
                      <linearGradient id="completedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00ff88" />
                        <stop offset="100%" stopColor="#00d4aa" />
                      </linearGradient>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#ffaa00" />
                      </linearGradient>
                      <linearGradient id="notStartedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b6b" />
                        <stop offset="100%" stopColor="#ee5a5a" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={styles.pieTrack}
                    />
                    
                    {/* Completed Segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`${styles.pieSegment} ${styles.segmentCompleted}`}
                      filter="url(#glow)"
                    />
                    
                    {/* In Progress Segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`${styles.pieSegment} ${styles.segmentProgress}`}
                    />
                    
                    {/* Not Started Segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`${styles.pieSegment} ${styles.segmentNotStarted}`}
                    />
                  </svg>
                  
                  <div className={styles.pieCenter}>
                    <div className={styles.pieCenterInner}>
                      <span className={styles.piePercentage}>{statsData.completed}</span>
                      <span className={styles.piePercentSign}>%</span>
                    </div>
                    <span className={styles.pieLabelText}>Completed</span>
                  </div>
                </div>
                
                <div className={styles.pieRings}>
                  <div className={styles.pieRing1}></div>
                  <div className={styles.pieRing2}></div>
                </div>
              </div>

              <div className={styles.legendContainer}>
                <div className={styles.legendItem}>
                  <div className={`${styles.legendDot} ${styles.legendCompleted}`}>
                    <span className={styles.legendPulse}></span>
                  </div>
                  <div className={styles.legendInfo}>
                    <span className={styles.legendLabel}>Completed</span>
                    <span className={styles.legendValue}>{statsData.completed}%</span>
                  </div>
                </div>
                <div className={styles.legendItem}>
                  <div className={`${styles.legendDot} ${styles.legendProgress}`}>
                    <span className={styles.legendPulse}></span>
                  </div>
                  <div className={styles.legendInfo}>
                    <span className={styles.legendLabel}>In Progress</span>
                    <span className={styles.legendValue}>{statsData.inProgress}%</span>
                  </div>
                </div>
                <div className={styles.legendItem}>
                  <div className={`${styles.legendDot} ${styles.legendNotStarted}`}>
                    <span className={styles.legendPulse}></span>
                  </div>
                  <div className={styles.legendInfo}>
                    <span className={styles.legendLabel}>Not Started</span>
                    <span className={styles.legendValue}>{statsData.notStarted}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxCorner1}></div>
          <div className={styles.boxCorner2}></div>
        </div>

        {/* Box 2: Progress */}
        <div className={`${styles.box} ${styles.progressBox}`}>
          <div className={styles.boxGlow}></div>
          <div className={styles.boxContent}>
            <div className={styles.boxHeader}>
              <div className={styles.boxIconWrapper}>
                <div className={`${styles.boxIconBg} ${styles.progressIconBg}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
              </div>
              <div className={styles.boxTitleGroup}>
                <h3 className={styles.boxTitle}>Learning Progress</h3>
                <span className={styles.boxSubtitle}>Skills development</span>
              </div>
              <div className={`${styles.boxBadge} ${styles.badgeWarning}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                +12%
              </div>
            </div>

            <div className={styles.progressContainer}>
              {progressData.map((item, index) => (
                <div key={index} className={styles.progressItem}>
                  <div className={styles.progressMeta}>
                    <div className={styles.progressLeft}>
                      <span className={styles.progressIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.progressLabel}>{item.label}</span>
                    </div>
                    <div className={styles.progressRight}>
                      <span className={`${styles.progressStatus} ${getLevelClass(item.level)}`}>
                        {item.level}
                      </span>
                      <span className={styles.progressValue}>{item.value}%</span>
                    </div>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={`${styles.progressFill} ${getProgressClass(item.value)} ${getLevelClass(item.level)}`}>
                      <div className={styles.progressGlow}></div>
                      <div className={styles.progressShine}></div>
                    </div>
                    <div className={styles.progressMarkers}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totalProgressCard}>
              <div className={styles.totalLeft}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10" />
                  <path d="M18 20V4" />
                  <path d="M6 20v-4" />
                </svg>
                <span>Total Progress</span>
              </div>
              <div className={styles.totalRight}>
                <span className={styles.totalValue}>67.5</span>
                <span className={styles.totalPercent}>%</span>
              </div>
            </div>
          </div>
          <div className={styles.boxCorner1}></div>
          <div className={styles.boxCorner2}></div>
        </div>

        {/* Box 3: Graph */}
        <div className={`${styles.box} ${styles.graphBox}`}>
          <div className={styles.boxGlow}></div>
          <div className={styles.boxContent}>
            <div className={styles.boxHeader}>
              <div className={styles.boxIconWrapper}>
                <div className={`${styles.boxIconBg} ${styles.graphIconBg}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
              </div>
              <div className={styles.boxTitleGroup}>
                <h3 className={styles.boxTitle}>Weekly Activity</h3>
                <span className={styles.boxSubtitle}>Hours spent learning</span>
              </div>
              <div className={styles.graphToggle}>
                <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>W</button>
                <button className={styles.toggleBtn}>M</button>
                <button className={styles.toggleBtn}>Y</button>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.graphYAxis}>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>
              
              <div className={styles.graphArea}>
                <div className={styles.graphGrid}>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>
                  <div className={styles.gridLine}></div>
                </div>
                
                <div className={styles.barGraph}>
                  {graphData.map((item, index) => (
                    <div key={index} className={styles.barColumn}>
                      <div className={styles.barWrapper}>
                        <div className={`${styles.bar} ${getBarHeightClass(item.value)}`}>
                          <div className={styles.barInner}>
                            <div className={styles.barGlow}></div>
                          </div>
                          <span className={styles.barTooltip}>
                            <span className={styles.tooltipValue}>{item.value}</span>
                            <span className={styles.tooltipLabel}>hours</span>
                          </span>
                        </div>
                      </div>
                      <span className={styles.barDay}>{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.graphStatsRow}>
              <div className={styles.graphStatCard}>
                <div className={styles.graphStatIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.graphStatInfo}>
                  <span className={styles.graphStatValue}>53.6</span>
                  <span className={styles.graphStatLabel}>Avg/Day</span>
                </div>
              </div>
              <div className={styles.graphStatCard}>
                <div className={`${styles.graphStatIcon} ${styles.statIconPurple}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className={styles.graphStatInfo}>
                  <span className={styles.graphStatValue}>375</span>
                  <span className={styles.graphStatLabel}>This Week</span>
                </div>
              </div>
              <div className={styles.graphStatCard}>
                <div className={`${styles.graphStatIcon} ${styles.statIconGreen}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  </svg>
                </div>
                <div className={styles.graphStatInfo}>
                  <span className={styles.graphStatValue}>+18%</span>
                  <span className={styles.graphStatLabel}>vs Last Week</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxCorner1}></div>
          <div className={styles.boxCorner2}></div>
        </div>
      </div>

      {/* Category Section Title */}
      <div className={styles.sectionHeader}>
        <div className={`${styles.sectionIcon} ${styles.categoryIcon}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <h2 className={styles.sectionTitle}>Learning Categories</h2>
        <div className={styles.sectionLine}></div>
      </div>

      {/* Category Section - 3 Boxes */}
      <div className={styles.categorySection}>
        {/* Box 1: Drive */}
        <div className={`${styles.categoryCard} ${styles.driveCard}`}>
          <div className={styles.cardBackground}>
            <div className={styles.cardOrb1}></div>
            <div className={styles.cardOrb2}></div>
            <div className={styles.cardPattern}></div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconBox} ${styles.driveIconBox}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <div className={styles.cardBadge}>
                <span className={styles.badgePulse}></span>
                New
              </div>
            </div>

            <h3 className={styles.cardTitle}>Drive</h3>
            <p className={styles.cardDescription}>
              Access your study materials, notes, and important documents all in one organized place.
            </p>

            <div className={styles.cardStats}>
              <div className={styles.cardStat}>
                <div className={styles.statIconMini}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>156</span>
                  <span className={styles.statText}>Files</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={styles.statIconMini}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>12</span>
                  <span className={styles.statText}>Folders</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={styles.statIconMini}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>2.4</span>
                  <span className={styles.statText}>GB</span>
                </div>
              </div>
            </div>

            <button className={`${styles.cardButton} ${styles.driveButton}`}>
              <span className={styles.buttonText}>Open Drive</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className={styles.buttonShine}></div>
            </button>
          </div>
          
          <div className={styles.cardBorder}></div>
        </div>

        {/* Box 2: Practice Set */}
        <div className={`${styles.categoryCard} ${styles.practiceCard}`}>
          <div className={styles.cardBackground}>
            <div className={styles.cardOrb1}></div>
            <div className={styles.cardOrb2}></div>
            <div className={styles.cardPattern}></div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconBox} ${styles.practiceIconBox}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <div className={`${styles.cardBadge} ${styles.badgePurple}`}>
                <span className={styles.badgePulse}></span>
                Popular
              </div>
            </div>

            <h3 className={styles.cardTitle}>Practice Set</h3>
            <p className={styles.cardDescription}>
              Sharpen your skills with curated practice problems and real-world coding challenges.
            </p>

            <div className={styles.cardStats}>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconPurple}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>248</span>
                  <span className={styles.statText}>Questions</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconPurple}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>89</span>
                  <span className={styles.statText}>Solved</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconPurple}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>4.8</span>
                  <span className={styles.statText}>Rating</span>
                </div>
              </div>
            </div>

            <button className={`${styles.cardButton} ${styles.practiceButton}`}>
              <span className={styles.buttonText}>Start Practice</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className={styles.buttonShine}></div>
            </button>
          </div>
          
          <div className={styles.cardBorder}></div>
        </div>

        {/* Box 3: Mock Interview */}
        <div className={`${styles.categoryCard} ${styles.mockCard}`}>
          <div className={styles.cardBackground}>
            <div className={styles.cardOrb1}></div>
            <div className={styles.cardOrb2}></div>
            <div className={styles.cardPattern}></div>
          </div>
          
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconBox} ${styles.mockIconBox}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div className={styles.iconGlow}></div>
              </div>
              <div className={`${styles.cardBadge} ${styles.badgeOrange}`}>
                <span className={styles.badgePulse}></span>
                Pro
              </div>
            </div>

            <h3 className={styles.cardTitle}>Mock Interview</h3>
            <p className={styles.cardDescription}>
              Prepare for real interviews with AI-powered mock sessions and detailed feedback.
            </p>

            <div className={styles.cardStats}>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconOrange}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>24</span>
                  <span className={styles.statText}>Sessions</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconOrange}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>4.2</span>
                  <span className={styles.statText}>Avg Score</span>
                </div>
              </div>
              <div className={styles.cardStat}>
                <div className={`${styles.statIconMini} ${styles.statIconOrange}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNum}>45</span>
                  <span className={styles.statText}>Hours</span>
                </div>
              </div>
            </div>

            <button className={`${styles.cardButton} ${styles.mockButton}`}>
              <span className={styles.buttonText}>Start Interview</span>
              <span className={styles.buttonIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className={styles.buttonShine}></div>
            </button>
          </div>
          
          <div className={styles.cardBorder}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;