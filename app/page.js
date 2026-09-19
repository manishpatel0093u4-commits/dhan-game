'use client';

import { useEffect, useMemo, useState } from 'react';

const colors = [
  { name: 'Red', value: '₹1.42', trend: '+8.4%', hex: '#ff6b6b', glow: 'rgba(255, 107, 107, 0.35)' },
  { name: 'Green', value: '₹1.88', trend: '+12.7%', hex: '#22c55e', glow: 'rgba(34, 197, 94, 0.35)' },
  { name: 'Violet', value: '₹2.14', trend: '+9.1%', hex: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)' },
];

const marketStats = [
  { label: 'Total Players', value: '18,420', note: '+5.2% today' },
  { label: 'Volume', value: '₹48.3L', note: 'Across all rounds' },
  { label: 'Hot Color', value: 'Violet', note: 'Strong momentum' },
  { label: 'Win Rate', value: '67.4%', note: 'Last 7 days' },
];

const recentHistory = [
  { round: '#1247', color: 'Green', amount: '₹280', result: 'Win' },
  { round: '#1246', color: 'Red', amount: '₹180', result: 'Lose' },
  { round: '#1245', color: 'Violet', amount: '₹420', result: 'Win' },
  { round: '#1244', color: 'Green', amount: '₹260', result: 'Win' },
];

const transactions = [
  { type: 'Deposit', amount: '+₹2,500', time: '2 min ago' },
  { type: 'Bet', amount: '-₹250', time: '8 min ago' },
  { type: 'Win', amount: '+₹680', time: '15 min ago' },
  { type: 'Withdraw', amount: '-₹1,000', time: '42 min ago' },
];

const adminSummary = [
  { label: 'Users online', value: '1,248' },
  { label: 'Pending payouts', value: '₹18,450' },
  { label: 'Today volume', value: '₹93,240' },
  { label: 'Active rounds', value: '34' },
];

const adminUsers = [
  { name: 'Ritesh', city: 'Mumbai', balance: '₹14,250', status: 'Active' },
  { name: 'Maya', city: 'Delhi', balance: '₹9,860', status: 'KYC OK' },
  { name: 'Ali', city: 'Hyderabad', balance: '₹6,440', status: 'Active' },
  { name: 'Nisha', city: 'Pune', balance: '₹11,320', status: 'Review' },
];

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('Green');
  const [stake, setStake] = useState(250);
  const [timer, setTimer] = useState(18);
  const [round, setRound] = useState(1248);
  const [wallet, setWallet] = useState(8420);
  const [result, setResult] = useState('Green is currently trending');
  const [lastBet, setLastBet] = useState('No recent bet');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          const winner = colors[Math.floor(Math.random() * colors.length)].name;
          setRound((current) => current + 1);
          setResult(`Round ${round + 1} winner: ${winner}`);
          setLastBet(`Last result: ${winner} color`);
          return 18;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round]);

  const selectedMeta = useMemo(
    () => colors.find((item) => item.name === selectedColor) || colors[1],
    [selectedColor]
  );

  const handlePlaceBet = () => {
    const amount = Number(stake) || 0;
    setWallet((prev) => prev - amount);
    const winChance = Math.random() > 0.45;
    const payout = winChance ? amount * 1.8 : 0;
    const outcome = winChance ? 'Win' : 'Lose';
    setResult(
      `${outcome}: ${winChance ? 'You won' : 'You lost'} ${winChance ? `₹${payout.toFixed(0)}` : `₹${amount}`}`
    );
    setLastBet(`${selectedColor} bet placed for ₹${amount}`);
    if (winChance) {
      setWallet((prev) => prev + payout);
    }
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <img src="/logo.svg" alt="DHAN GAME logo" className="brand-logo" />
          <div>
            <div className="brand-name">DHAN GAME</div>
            <div className="brand-tag">Color trading arena</div>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#game">Game</a>
          <a href="#history">History</a>
          <a href="#admin">Admin</a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-light">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">Smart color trading platform</span>
          <h1>Play. Predict. Build your winning streak.</h1>
          <p>
            DHAN GAME blends fast color prediction rounds with a premium wallet experience,
            live market pulse, and a powerful admin control panel.
          </p>

          <div className="cta-row">
            <a href="#game" className="btn btn-primary large">Start Playing</a>
            <a href="#admin" className="btn btn-light large">View Admin</a>
          </div>

          <div className="mini-stats">
            {marketStats.map((stat) => (
              <div key={stat.label} className="mini-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-top">
            <span>Live Market</span>
            <span className="live-pill">● Live</span>
          </div>

          <div className="pulse-row">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`pulse-card ${selectedColor === color.name ? 'selected' : ''}`}
                onClick={() => setSelectedColor(color.name)}
                style={{ '--card-color': color.hex, '--card-glow': color.glow }}
              >
                <span className="dot" />
                <div className="card-title">{color.name}</div>
                <strong>{color.value}</strong>
                <small>{color.trend}</small>
              </div>
            ))}
          </div>

          <div className="panel-summary">
            <div>
              <span>Wallet</span>
              <strong>₹{wallet.toLocaleString()}</strong>
            </div>
            <div>
              <span>Last result</span>
              <strong>{lastBet}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="game-grid" id="game">
        <div className="game-card main-game">
          <div className="section-head">
            <div>
              <span className="section-kicker">Round table</span>
              <h2>Current Game</h2>
            </div>
            <div className="round-wrap">
              <span>Round</span>
              <strong>#{round}</strong>
            </div>
          </div>

          <div className="countdown-box">
            <span>Next round in</span>
            <strong>{timer}s</strong>
          </div>

          <div className="pick-grid">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`pick-btn ${selectedColor === color.name ? 'active' : ''}`}
                style={{ borderColor: color.hex, background: selectedColor === color.name ? color.glow : 'transparent' }}
                onClick={() => setSelectedColor(color.name)}
              >
                <span className="pick-dot" style={{ background: color.hex }} />
                {color.name}
              </button>
            ))}
          </div>

          <div className="bet-panel">
            <label>Stake Amount</label>
            <div className="stake-row">
              <button onClick={() => setStake((prev) => Math.max(50, prev - 50))}>-</button>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Number(e.target.value) || 0)}
                min="50"
              />
              <button onClick={() => setStake((prev) => prev + 50)}>+</button>
            </div>
          </div>

          <div className="bet-summary">
            <div>
              <span>Selected color</span>
              <strong>{selectedColor}</strong>
            </div>
            <div>
              <span>Multiplier</span>
              <strong>1.8x</strong>
            </div>
            <div>
              <span>Potential win</span>
              <strong>₹{(stake * 1.8).toFixed(0)}</strong>
            </div>
          </div>

          <button className="btn btn-primary wide" onClick={handlePlaceBet}>Place Bet</button>
          <p className="status-line">{result}</p>
        </div>

        <aside className="game-card side-panel" id="history">
          <div className="section-head compact">
            <div>
              <span className="section-kicker">My portfolio</span>
              <h3>Recent Activity</h3>
            </div>
          </div>

          <div className="wallet-box">
            <span>Available balance</span>
            <strong>₹{wallet.toLocaleString()}</strong>
            <small>+₹1,200 this week</small>
          </div>

          <div className="transaction-list">
            {transactions.map((tx) => (
              <div key={tx.type + tx.time} className="tx-row">
                <div>
                  <strong>{tx.type}</strong>
                  <small>{tx.time}</small>
                </div>
                <span className={tx.amount.startsWith('+') ? 'gain' : 'loss'}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="history-section">
        <div className="section-head left">
          <div>
            <span className="section-kicker">Live results</span>
            <h2>Winning History</h2>
          </div>
        </div>

        <div className="history-table">
          {recentHistory.map((row) => (
            <div key={row.round} className="history-row">
              <span>{row.round}</span>
              <span className="chip chip-red">{row.color}</span>
              <span>{row.amount}</span>
              <span className={row.result === 'Win' ? 'win' : 'lose'}>{row.result}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel" id="admin">
        <div className="section-head left">
          <div>
            <span className="section-kicker">Admin control</span>
            <h2>Operations Dashboard</h2>
          </div>
        </div>

        <div className="admin-grid">
          {adminSummary.map((stat) => (
            <div key={stat.label} className="mini-admin-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>City</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>{user.city}</td>
                  <td>{user.balance}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase().includes('kyc') ? 'status-amber' : user.status === 'Active' ? 'status-green' : 'status-gray'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
