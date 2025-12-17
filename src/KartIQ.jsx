import React, { useState } from 'react';

// ============================================================================
// KARTIQ COMPREHENSIVE PROTOTYPE
// 15 Priority Screens | Dark Mode | Responsive | Two Driver Personas
// ============================================================================

// === MOCK DATA ===
const drivers = {
  alex: {
    id: 'alex',
    name: 'Alex Martinez',
    age: 15,
    category: 'Junior',
    weight: '52kg',
    experience: '4 years',
    avatar: '🏎️',
    score: 85,
    status: 'go',
    trend: 'up',
    lastUpdate: '8 mins ago',
    components: {
      sleep: { score: 92, weight: 0.30, trend: 'up', value: '8.2h', target: '8h' },
      hrv: { score: 88, weight: 0.25, trend: 'up', value: '58ms', baseline: '52ms' },
      fatigue: { score: 85, weight: 0.20, trend: 'stable', value: '3/10', label: 'Low' },
      nutrition: { score: 82, weight: 0.15, trend: 'up', value: '94%', label: 'On Track' },
      load: { score: 78, weight: 0.10, trend: 'stable', value: '1.1', label: 'Optimal' }
    },
    genetics: {
      overall: 'favorable',
      muscleType: { slow: 65, fast: 35 },
      metabolism: { carbs: 'HIGH', fats: 'MEDIUM', protein: 'HIGH', caffeine: 'FAST' },
      injuries: { achilles: 'LOW', muscle: 'NORMAL', tendon: 'LOW' },
      cardiovascular: { risk: 'LOW', clearance: true },
      vitamins: { d: 'HIGH', b12: 'MEDIUM', iron: 'NORMAL', magnesium: 'HIGH' },
      supplements: { creatine: 'HIGH', coq10: 'MEDIUM', omega3: 'HIGH' },
      behavioral: { chronotype: 'Morning', anxiety: 'LOW', focus: 'HIGH' }
    },
    nutrition: {
      calories: { current: 2150, target: 2400 },
      protein: { current: 125, target: 140 },
      carbs: { current: 280, target: 320 },
      fats: { current: 72, target: 80 },
      water: { current: 2.8, target: 3.5 },
      micros: {
        vitaminD: { current: 85, status: 'good' },
        magnesium: { current: 72, status: 'moderate' },
        iron: { current: 95, status: 'good' },
        zinc: { current: 68, status: 'moderate' },
        b12: { current: 90, status: 'good' }
      }
    },
    supplements: [
      { name: 'Omega-3 Fish Oil', dose: '1000mg', timing: 'Morning', compliance: 95 },
      { name: 'Vitamin D3', dose: '2000 IU', timing: 'Morning', compliance: 100 },
      { name: 'Magnesium', dose: '400mg', timing: 'Evening', compliance: 85 }
    ],
    tests: {
      reactionTime: { value: '0.21s', percentile: 85, trend: 'up', date: '2 days ago' },
      gripStrength: { value: '38kg', percentile: 78, trend: 'stable', date: '1 week ago' },
      neckStrength: { value: '22kg', percentile: 82, trend: 'up', date: '1 week ago' },
      vo2max: { value: '48', percentile: 75, trend: 'up', date: '1 month ago' }
    },
    recommendations: [
      { icon: '💧', title: 'Pre-hydrate', desc: '500ml water before session', priority: 1 },
      { icon: '🔄', title: 'Neck warm-up', desc: '5 min mobility routine', priority: 2 }
    ],
    weekHistory: [78, 82, 79, 85, 83, 88, 85]
  },
  sofia: {
    id: 'sofia',
    name: 'Sofia Chen',
    age: 14,
    category: 'Junior',
    weight: '48kg',
    experience: '3 years',
    avatar: '🏁',
    score: 68,
    status: 'caution',
    trend: 'down',
    lastUpdate: '12 mins ago',
    components: {
      sleep: { score: 58, weight: 0.30, trend: 'down', value: '5.8h', target: '8h' },
      hrv: { score: 65, weight: 0.25, trend: 'down', value: '38ms', baseline: '48ms' },
      fatigue: { score: 55, weight: 0.20, trend: 'down', value: '7/10', label: 'High' },
      nutrition: { score: 78, weight: 0.15, trend: 'stable', value: '82%', label: 'Moderate' },
      load: { score: 88, weight: 0.10, trend: 'up', value: '1.3', label: 'Elevated' }
    },
    genetics: {
      overall: 'moderate_risk',
      muscleType: { slow: 45, fast: 55 },
      metabolism: { carbs: 'MEDIUM', fats: 'HIGH', protein: 'MEDIUM', caffeine: 'SLOW' },
      injuries: { achilles: 'MEDIUM-HIGH', muscle: 'MEDIUM', tendon: 'MEDIUM' },
      cardiovascular: { risk: 'MEDIUM', clearance: true, flags: ['Elevated BP during exercise'] },
      vitamins: { d: 'HIGH', b12: 'HIGH', iron: 'MEDIUM-HIGH', magnesium: 'HIGH' },
      supplements: { creatine: 'HIGH', coq10: 'HIGH', omega3: 'HIGH', resveratrol: 'HIGH' },
      behavioral: { chronotype: 'Evening', anxiety: 'MEDIUM-HIGH', focus: 'MEDIUM' }
    },
    nutrition: {
      calories: { current: 1650, target: 2200 },
      protein: { current: 85, target: 120 },
      carbs: { current: 220, target: 280 },
      fats: { current: 58, target: 70 },
      water: { current: 1.8, target: 3.0 },
      micros: {
        vitaminD: { current: 45, status: 'low' },
        magnesium: { current: 52, status: 'low' },
        iron: { current: 62, status: 'moderate' },
        zinc: { current: 48, status: 'low' },
        b12: { current: 55, status: 'moderate' }
      }
    },
    supplements: [
      { name: 'Vitamin D3', dose: '2000 IU', timing: 'Morning', compliance: 65 }
    ],
    tests: {
      reactionTime: { value: '0.28s', percentile: 62, trend: 'down', date: '3 days ago' },
      gripStrength: { value: '32kg', percentile: 70, trend: 'stable', date: '1 week ago' },
      neckStrength: { value: '18kg', percentile: 65, trend: 'down', date: '1 week ago' },
      vo2max: { value: '42', percentile: 68, trend: 'stable', date: '1 month ago' }
    },
    recommendations: [
      { icon: '😴', title: 'Priority: Sleep', desc: 'Target 8+ hours tonight', priority: 1 },
      { icon: '⚠️', title: 'Reduce intensity', desc: 'Light session only today', priority: 1 },
      { icon: '🥗', title: 'Increase protein', desc: 'Add protein to lunch', priority: 2 }
    ],
    weekHistory: [75, 72, 78, 71, 69, 65, 68]
  }
};

const mealSuggestions = {
  alex: {
    context: 'Race Day Tomorrow',
    meal: {
      name: 'Performance Dinner',
      description: 'Optimized for your HIGH carb metabolism and race-day energy needs',
      items: [
        { name: 'Grilled Chicken Breast', amount: '180g', benefit: 'Lean protein for muscle maintenance' },
        { name: 'Sweet Potato', amount: '200g', benefit: 'Complex carbs for sustained energy' },
        { name: 'Steamed Broccoli', amount: '150g', benefit: 'Magnesium & fiber' },
        { name: 'Olive Oil Drizzle', amount: '1 tbsp', benefit: 'Healthy fats per your genetics' }
      ],
      macros: { calories: 620, protein: 48, carbs: 65, fats: 18 },
      genetic_match: ['HIGH carb metabolism', 'HIGH protein benefit', 'Mediterranean diet benefit']
    }
  },
  sofia: {
    context: 'Recovery Focus Day',
    meal: {
      name: 'Recovery & Rest Dinner',
      description: 'Designed to address your vitamin D and magnesium gaps while supporting recovery',
      items: [
        { name: 'Salmon Fillet', amount: '150g', benefit: 'Omega-3 + Vitamin D (genetic need: HIGH)' },
        { name: 'Quinoa', amount: '1 cup', benefit: 'Complete protein + Magnesium' },
        { name: 'Spinach Salad', amount: '100g', benefit: 'Iron + B12 support' },
        { name: 'Pumpkin Seeds', amount: '30g', benefit: 'Zinc (current level: LOW)' }
      ],
      macros: { calories: 580, protein: 42, carbs: 48, fats: 24 },
      genetic_match: ['HIGH Vitamin D need', 'HIGH Magnesium need', 'Omega-3 benefit']
    }
  }
};

const supplementRecs = {
  alex: [
    { name: 'Creatine Monohydrate', dose: '5g/day', reason: 'Genetic benefit: HIGH', priority: 'recommended', taking: false },
    { name: 'CoQ10', dose: '100mg/day', reason: 'Supports energy production', priority: 'optional', taking: false }
  ],
  sofia: [
    { name: 'Vitamin D3', dose: '4000 IU/day', reason: 'Genetic need: HIGH, Current: LOW', priority: 'critical', taking: true, needsIncrease: true },
    { name: 'Magnesium Glycinate', dose: '400mg/day', reason: 'Genetic need: HIGH, Current: LOW', priority: 'critical', taking: false },
    { name: 'CoQ10', dose: '200mg/day', reason: 'Genetic benefit: HIGH, Supports heart health', priority: 'recommended', taking: false },
    { name: 'Omega-3', dose: '2000mg/day', reason: 'Genetic benefit: HIGH, Anti-inflammatory', priority: 'recommended', taking: false }
  ]
};

// === UTILITY COMPONENTS ===
const StatusBadge = ({ status, size = 'normal' }) => {
  const styles = {
    go: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-400' },
    caution: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
    no_go: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' }
  };
  const s = styles[status];
  const label = status === 'go' ? '✓ GO' : status === 'caution' ? '⚠ CAUTION' : '✕ NO-GO';
  const padding = size === 'small' ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm';
  
  return (
    <span className={`${s.bg} ${s.text} border ${s.border} ${padding} rounded-full font-bold uppercase tracking-wider`}>
      {label}
    </span>
  );
};

const ScoreRing = ({ score, size = 120, status = 'go' }) => {
  const colors = { go: '#10b981', caution: '#f59e0b', no_go: '#ef4444' };
  const color = colors[status];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size/2} cy={size/2} r="45" stroke="#1e1e2e" strokeWidth="8" fill="none" />
        <circle 
          cx={size/2} cy={size/2} r="45" 
          stroke={color} strokeWidth="8" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-gray-500">/ 100</span>
      </div>
    </div>
  );
};

const ProgressBar = ({ value, max = 100, color = 'indigo', height = 'h-2' }) => {
  const colors = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500'
  };
  const pct = Math.min((value / max) * 100, 100);
  const barColor = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500';
  
  return (
    <div className={`w-full bg-gray-800 rounded-full ${height}`}>
      <div className={`${color === 'auto' ? barColor : colors[color]} ${height} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
};

const TrendIcon = ({ trend }) => {
  if (trend === 'up') return <span className="text-emerald-400">↑</span>;
  if (trend === 'down') return <span className="text-red-400">↓</span>;
  return <span className="text-gray-500">→</span>;
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-4 ${onClick ? 'cursor-pointer hover:bg-gray-900/70 transition-colors' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const NavButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    {children}
  </button>
);

// === DRIVER SCREENS ===

// D6 - Driver Home Dashboard
const DriverHome = ({ driver, onNavigate }) => {
  const statusColors = {
    go: { bg: 'from-emerald-900/30 to-emerald-950/50', border: 'border-emerald-500/50', glow: 'shadow-emerald-500/20' },
    caution: { bg: 'from-amber-900/30 to-amber-950/50', border: 'border-amber-500/50', glow: 'shadow-amber-500/20' },
    no_go: { bg: 'from-red-900/30 to-red-950/50', border: 'border-red-500/50', glow: 'shadow-red-500/20' }
  };
  const sc = statusColors[driver.status];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Good morning</p>
          <h1 className="text-2xl font-bold text-white">{driver.name.split(' ')[0]} 👋</h1>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
          {driver.avatar}
        </div>
      </div>

      {/* Main Score Card */}
      <Card className={`bg-gradient-to-br ${sc.bg} border ${sc.border} shadow-lg ${sc.glow}`} onClick={() => onNavigate('breakdown')}>
        <div className="text-center py-4">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Today's Readiness</p>
          <div className="flex justify-center mb-4">
            <ScoreRing score={driver.score} status={driver.status} />
          </div>
          <StatusBadge status={driver.status} />
          <p className="text-gray-500 text-sm mt-4">
            {driver.status === 'go' ? 'All systems optimal. Ready to race!' : 
             driver.status === 'caution' ? 'Some factors need attention' : 'Rest recommended today'}
          </p>
          <p className="text-gray-600 text-xs mt-2">Tap for detailed breakdown →</p>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🌙', label: 'Sleep', value: driver.components.sleep.value, onClick: () => onNavigate('breakdown') },
          { icon: '💓', label: 'HRV', value: driver.components.hrv.value, onClick: () => onNavigate('breakdown') },
          { icon: '🍽️', label: 'Nutrition', value: driver.components.nutrition.value, onClick: () => onNavigate('nutrition') }
        ].map((stat, i) => (
          <Card key={i} onClick={stat.onClick} className="text-center py-3">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-white font-semibold">{stat.value}</div>
            <div className="text-gray-500 text-xs">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Today's Recommendations */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-semibold">Today's Focus</h2>
          <span className="text-indigo-400 text-sm">View all →</span>
        </div>
        {driver.recommendations.slice(0, 2).map((rec, i) => (
          <Card key={i} className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-xl">{rec.icon}</div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{rec.title}</p>
              <p className="text-gray-500 text-xs">{rec.desc}</p>
            </div>
            <span className="text-indigo-400">→</span>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate('checkin')} className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition-colors">
          Morning Check-in
        </button>
        <button onClick={() => onNavigate('nutrition')} className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors">
          Log Meal
        </button>
      </div>

      {/* 7-Day Trend */}
      <Card>
        <p className="text-gray-400 text-xs mb-3">7-Day Readiness Trend</p>
        <div className="flex items-end justify-between h-16 gap-1">
          {driver.weekHistory.map((score, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className={`w-full rounded-t ${i === 6 ? 'bg-indigo-500' : 'bg-gray-700'}`}
                style={{ height: `${score * 0.6}px` }}
              />
              <span className="text-gray-600 text-xs">{['M','T','W','T','F','S','S'][i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// D7 - Score Breakdown
const ScoreBreakdown = ({ driver, onBack }) => {
  const components = [
    { key: 'sleep', icon: '🌙', name: 'Sleep Quality', color: 'emerald' },
    { key: 'hrv', icon: '💓', name: 'Recovery (HRV)', color: 'blue' },
    { key: 'fatigue', icon: '⚡', name: 'Energy Level', color: 'amber' },
    { key: 'nutrition', icon: '🥗', name: 'Nutrition', color: 'green' },
    { key: 'load', icon: '📊', name: 'Training Load', color: 'purple' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Score Breakdown</h1>
      </div>

      {/* Overall Score */}
      <Card className="text-center py-6">
        <div className="flex justify-center mb-4">
          <ScoreRing score={driver.score} size={140} status={driver.status} />
        </div>
        <StatusBadge status={driver.status} />
        <p className="text-gray-500 text-sm mt-3">Updated {driver.lastUpdate}</p>
      </Card>

      {/* Component Breakdown */}
      <div className="space-y-3">
        <h2 className="text-white font-semibold">Factor Analysis</h2>
        {components.map(({ key, icon, name }) => {
          const comp = driver.components[key];
          return (
            <Card key={key}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{icon}</span>
                <span className="text-white font-medium flex-1">{name}</span>
                <span className="text-gray-400 text-sm">{(comp.weight * 100).toFixed(0)}% weight</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <ProgressBar value={comp.score} color="auto" />
                </div>
                <span className="text-white font-bold w-10">{comp.score}</span>
                <TrendIcon trend={comp.trend} />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-gray-500">Current: {comp.value}</span>
                {comp.target && <span className="text-gray-500">Target: {comp.target}</span>}
                {comp.baseline && <span className="text-gray-500">Baseline: {comp.baseline}</span>}
                {comp.label && <span className="text-gray-500">{comp.label}</span>}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Insights */}
      <Card className="border-indigo-500/30 bg-indigo-950/20">
        <h3 className="text-indigo-400 font-medium mb-2">💡 AI Insight</h3>
        <p className="text-gray-300 text-sm">
          {driver.status === 'go' 
            ? `Your readiness is excellent today. Sleep quality (+${driver.components.sleep.score - 80}% above baseline) is your strongest factor. You're primed for a high-intensity session.`
            : `Sleep is your primary limiting factor today (${driver.components.sleep.value} vs ${driver.components.sleep.target} target). This is affecting your HRV recovery. Consider a lighter session or rest day.`}
        </p>
      </Card>
    </div>
  );
};

// D10 - Morning Check-In
const MorningCheckIn = ({ driver, onBack, onComplete }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ sleep: 7, fatigue: 3, mood: 7, soreness: 2, neck: 1, stress: 3 });
  
  const questions = [
    { key: 'sleep', label: 'How many hours did you sleep?', icon: '🌙', min: 4, max: 12, unit: 'hours' },
    { key: 'fatigue', label: 'How tired do you feel?', icon: '😴', min: 1, max: 10, labels: ['Fresh', 'Exhausted'] },
    { key: 'mood', label: 'How is your mood?', icon: '😊', min: 1, max: 10, labels: ['Low', 'Great'] },
    { key: 'soreness', label: 'Any muscle soreness?', icon: '💪', min: 1, max: 10, labels: ['None', 'Severe'] },
    { key: 'neck', label: 'Neck discomfort level?', icon: '🦴', min: 0, max: 10, labels: ['None', 'Severe'] },
    { key: 'stress', label: 'Stress level?', icon: '🧠', min: 1, max: 10, labels: ['Calm', 'Stressed'] }
  ];

  const q = questions[step];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Morning Check-In</h1>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-gray-800'}`} />
        ))}
      </div>

      {/* Question Card */}
      <Card className="py-8 text-center">
        <div className="text-5xl mb-4">{q.icon}</div>
        <h2 className="text-white text-lg font-medium mb-8">{q.label}</h2>
        
        <div className="text-5xl font-bold text-white mb-4">
          {values[q.key]}{q.unit ? ` ${q.unit}` : ''}
        </div>

        <input
          type="range"
          min={q.min}
          max={q.max}
          value={values[q.key]}
          onChange={(e) => setValues({ ...values, [q.key]: Number(e.target.value) })}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />

        {q.labels && (
          <div className="flex justify-between text-gray-500 text-sm mt-2">
            <span>{q.labels[0]}</span>
            <span>{q.labels[1]}</span>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-medium">
            Previous
          </button>
        )}
        <button 
          onClick={() => step < questions.length - 1 ? setStep(step + 1) : onComplete()}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium"
        >
          {step < questions.length - 1 ? 'Next' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

// D13 - Nutrition Dashboard
const NutritionDashboard = ({ driver, onNavigate }) => {
  const n = driver.nutrition;
  const macros = [
    { name: 'Calories', current: n.calories.current, target: n.calories.target, unit: 'kcal', color: 'indigo' },
    { name: 'Protein', current: n.protein.current, target: n.protein.target, unit: 'g', color: 'emerald' },
    { name: 'Carbs', current: n.carbs.current, target: n.carbs.target, unit: 'g', color: 'amber' },
    { name: 'Fats', current: n.fats.current, target: n.fats.target, unit: 'g', color: 'blue' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Nutrition</h1>
        <span className="text-gray-500 text-sm">Today</span>
      </div>

      {/* Calorie Ring */}
      <Card className="text-center py-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="transform -rotate-90" width="128" height="128">
            <circle cx="64" cy="64" r="56" stroke="#1e1e2e" strokeWidth="12" fill="none" />
            <circle 
              cx="64" cy="64" r="56" 
              stroke="#6366f1" strokeWidth="12" fill="none"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - n.calories.current / n.calories.target)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{n.calories.current}</span>
            <span className="text-gray-500 text-xs">/ {n.calories.target} kcal</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{n.calories.target - n.calories.current} kcal remaining</p>
      </Card>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3">
        {macros.slice(1).map((m) => (
          <Card key={m.name} className="text-center py-3">
            <div className="text-white font-bold">{m.current}<span className="text-gray-500 text-xs">/{m.target}</span></div>
            <div className="text-gray-500 text-xs mb-2">{m.name} ({m.unit})</div>
            <ProgressBar value={m.current} max={m.target} color={m.color} height="h-1" />
          </Card>
        ))}
      </div>

      {/* Hydration */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">💧 Hydration</span>
          <span className="text-white">{n.water.current}L / {n.water.target}L</span>
        </div>
        <ProgressBar value={n.water.current} max={n.water.target} color="blue" />
      </Card>

      {/* Micronutrients */}
      <Card>
        <h3 className="text-white font-medium mb-3">Micronutrients</h3>
        <div className="space-y-2">
          {Object.entries(n.micros).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-gray-400 text-sm w-24 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className="flex-1">
                <ProgressBar value={val.current} color="auto" height="h-1.5" />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${
                val.status === 'good' ? 'bg-emerald-500/20 text-emerald-400' :
                val.status === 'moderate' ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>{val.current}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-indigo-600 text-white py-3 rounded-xl font-medium">+ Log Meal</button>
        <button onClick={() => onNavigate('meals')} className="bg-gray-800 text-white py-3 rounded-xl font-medium">AI Suggestions</button>
      </div>
    </div>
  );
};

// D16 - AI Meal Suggestions
const AIMealSuggestions = ({ driver, onBack }) => {
  const suggestion = mealSuggestions[driver.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">AI Meal Suggestions</h1>
      </div>

      {/* Context */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🤖</div>
          <div>
            <p className="text-indigo-400 font-medium">Personalized for You</p>
            <p className="text-gray-400 text-sm">{suggestion.context}</p>
          </div>
        </div>
      </Card>

      {/* Meal Card */}
      <Card>
        <h2 className="text-white text-lg font-bold mb-2">{suggestion.meal.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{suggestion.meal.description}</p>

        {/* Items */}
        <div className="space-y-3 mb-4">
          {suggestion.meal.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-sm">🍽️</div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-gray-500 text-sm">{item.amount}</span>
                </div>
                <p className="text-emerald-400 text-xs mt-1">✓ {item.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Macros */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-gray-800/50 rounded-lg mb-4">
          <div className="text-center">
            <div className="text-white font-bold">{suggestion.meal.macros.calories}</div>
            <div className="text-gray-500 text-xs">kcal</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 font-bold">{suggestion.meal.macros.protein}g</div>
            <div className="text-gray-500 text-xs">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-amber-400 font-bold">{suggestion.meal.macros.carbs}g</div>
            <div className="text-gray-500 text-xs">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">{suggestion.meal.macros.fats}g</div>
            <div className="text-gray-500 text-xs">Fats</div>
          </div>
        </div>

        {/* Genetic Match */}
        <div className="border-t border-gray-800 pt-3">
          <p className="text-gray-500 text-xs mb-2">🧬 Matched to your genetics:</p>
          <div className="flex flex-wrap gap-2">
            {suggestion.meal.genetic_match.map((tag, i) => (
              <span key={i} className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </Card>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">
        Add to Today's Log
      </button>
    </div>
  );
};

// D19 - Supplement Dashboard
const SupplementDashboard = ({ driver, onNavigate }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Supplements</h1>
        <button className="text-indigo-400 text-sm">+ Add</button>
      </div>

      {/* Current Stack */}
      <div>
        <h2 className="text-gray-400 text-sm mb-3">Current Stack</h2>
        {driver.supplements.length > 0 ? driver.supplements.map((sup, i) => (
          <Card key={i} className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">💊</div>
            <div className="flex-1">
              <p className="text-white font-medium">{sup.name}</p>
              <p className="text-gray-500 text-xs">{sup.dose} • {sup.timing}</p>
            </div>
            <div className="text-right">
              <div className="text-emerald-400 font-bold">{sup.compliance}%</div>
              <div className="text-gray-500 text-xs">compliance</div>
            </div>
          </Card>
        )) : (
          <Card className="text-center py-8 text-gray-500">
            No supplements logged yet
          </Card>
        )}
      </div>

      {/* AI Recommendations Preview */}
      <Card className="border-indigo-500/30 bg-indigo-950/20" onClick={() => onNavigate('supplementRecs')}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">🤖</div>
          <div className="flex-1">
            <p className="text-indigo-400 font-medium">AI Recommendations Available</p>
            <p className="text-gray-400 text-sm">Based on your genetic profile</p>
          </div>
          <span className="text-indigo-400">→</span>
        </div>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <h3 className="text-white font-medium mb-3">Today's Schedule</h3>
        <div className="space-y-2">
          {driver.supplements.map((sup, i) => (
            <div key={i} className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-800 border-gray-600 text-indigo-500" />
              <span className="text-gray-400 text-sm flex-1">{sup.timing}: {sup.name}</span>
              <span className="text-gray-500 text-xs">{sup.dose}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// D21 - AI Supplement Recommendations
const AISupplementRecs = ({ driver, onBack }) => {
  const recs = supplementRecs[driver.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">AI Recommendations</h1>
      </div>

      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <p className="text-indigo-400 font-medium">🧬 Based on Your Genetics</p>
        <p className="text-gray-400 text-sm mt-1">These recommendations are personalized to your genetic profile and current nutritional status.</p>
      </Card>

      {recs.map((rec, i) => (
        <Card key={i} className={`${
          rec.priority === 'critical' ? 'border-red-500/30 bg-red-950/10' :
          rec.priority === 'recommended' ? 'border-amber-500/30 bg-amber-950/10' :
          'border-gray-700'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              rec.priority === 'critical' ? 'bg-red-500/20' :
              rec.priority === 'recommended' ? 'bg-amber-500/20' : 'bg-gray-800'
            }`}>
              💊
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{rec.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded uppercase ${
                  rec.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                  rec.priority === 'recommended' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-gray-700 text-gray-400'
                }`}>{rec.priority}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{rec.dose}</p>
              <p className="text-emerald-400 text-xs mt-2">✓ {rec.reason}</p>
              {rec.taking && (
                <p className="text-amber-400 text-xs mt-1">
                  {rec.needsIncrease ? '⚠️ Currently taking but dosage may need increase' : '✓ Already in your stack'}
                </p>
              )}
            </div>
          </div>
          {!rec.taking && (
            <button className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm transition-colors">
              + Add to Stack
            </button>
          )}
        </Card>
      ))}

      <p className="text-gray-500 text-xs text-center">
        Always consult with a healthcare provider before starting new supplements.
      </p>
    </div>
  );
};

// D22 - Genetic Overview
const GeneticOverview = ({ driver, onBack }) => {
  const g = driver.genetics;

  const categories = [
    { name: 'Muscle Fiber Type', icon: '💪', data: `${g.muscleType.slow}% Slow / ${g.muscleType.fast}% Fast`, insight: g.muscleType.slow > 50 ? 'Better endurance capacity' : 'Better explosive power' },
    { name: 'Metabolism', icon: '🔥', data: `Carbs: ${g.metabolism.carbs} | Fats: ${g.metabolism.fats}`, insight: `Caffeine: ${g.metabolism.caffeine} metabolizer` },
    { name: 'Injury Risk', icon: '🩹', data: `Achilles: ${g.injuries.achilles} | Muscle: ${g.injuries.muscle}`, insight: g.injuries.achilles === 'LOW' ? 'Lower injury predisposition' : 'Monitor load carefully' },
    { name: 'Cardiovascular', icon: '❤️', data: `Risk Level: ${g.cardiovascular.risk}`, insight: g.cardiovascular.clearance ? 'Medical clearance: ✓' : '⚠️ Clearance required', flag: g.cardiovascular.risk !== 'LOW' },
    { name: 'Vitamin Needs', icon: '💊', data: `D: ${g.vitamins.d} | Mg: ${g.vitamins.magnesium}`, insight: 'See supplement recommendations' },
    { name: 'Behavioral', icon: '🧠', data: `${g.behavioral.chronotype} person | Anxiety: ${g.behavioral.anxiety}`, insight: `Best training time: ${g.behavioral.chronotype === 'Morning' ? 'AM sessions' : 'PM sessions'}` }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Genetic Profile</h1>
      </div>

      {/* Overall Status */}
      <Card className={`text-center py-6 ${
        g.overall === 'favorable' ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-amber-500/30 bg-amber-950/20'
      }`}>
        <div className="text-4xl mb-2">🧬</div>
        <h2 className="text-white text-lg font-bold">
          {g.overall === 'favorable' ? 'Favorable Profile' : 'Moderate Risk Profile'}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {g.overall === 'favorable' 
            ? 'Your genetics support high-performance karting with lower injury risk'
            : 'Some genetic factors require attention and careful management'}
        </p>
      </Card>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((cat, i) => (
          <Card key={i} className={cat.flag ? 'border-amber-500/30' : ''}>
            <div className="flex items-start gap-3">
              <div className="text-2xl">{cat.icon}</div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.data}</p>
                <p className={`text-xs mt-1 ${cat.flag ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {cat.flag ? '⚠️' : '✓'} {cat.insight}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Cardiovascular Warning (if applicable) */}
      {g.cardiovascular.flags && (
        <Card className="border-amber-500/50 bg-amber-950/20">
          <h3 className="text-amber-400 font-medium mb-2">⚠️ Cardiovascular Notes</h3>
          {g.cardiovascular.flags.map((flag, i) => (
            <p key={i} className="text-gray-300 text-sm">• {flag}</p>
          ))}
          <p className="text-gray-500 text-xs mt-2">Regular cardiac monitoring recommended</p>
        </Card>
      )}
    </div>
  );
};

// D5 - Upload Genetic Report
const UploadGeneticReport = ({ onBack, onComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Genetic Report</h1>
      </div>

      {!uploaded ? (
        <>
          <Card className="text-center py-12 border-dashed border-2 border-gray-700">
            {uploading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                <p className="text-white">Analyzing report with AI...</p>
                <p className="text-gray-500 text-sm">Extracting genetic markers</p>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-4">📄</div>
                <h2 className="text-white text-lg font-medium mb-2">Upload Genetic Report</h2>
                <p className="text-gray-500 text-sm mb-6">PDF files from supported labs</p>
                <button onClick={handleUpload} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium">
                  Select File
                </button>
              </>
            )}
          </Card>

          <Card>
            <h3 className="text-white font-medium mb-3">Supported Reports</h3>
            <div className="space-y-2">
              {['Precysia Fitness Panel', 'Precysia Cardiovascular Panel', 'DNAfit', '23andMe (raw data)'].map((lab, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-emerald-400">✓</span>
                  {lab}
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className="text-center py-8 border-emerald-500/30 bg-emerald-950/20">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-white text-lg font-medium mb-2">Report Processed!</h2>
            <p className="text-gray-400 text-sm">AI extracted 156 genetic markers</p>
          </Card>

          <Card>
            <h3 className="text-white font-medium mb-3">Extracted Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Metabolism', 'Muscle Fibers', 'Injury Risk', 'Cardiovascular', 'Vitamins', 'Minerals', 'Supplements', 'Behavioral'].map((cat, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-2 text-center">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span className="text-gray-300 text-sm ml-2">{cat}</span>
                </div>
              ))}
            </div>
          </Card>

          <button onClick={onComplete} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">
            View My Genetic Profile
          </button>
        </>
      )}
    </div>
  );
};

// === COACH SCREENS ===

// C3 - Coach Team Dashboard
const CoachTeamDashboard = ({ onSelectDriver }) => {
  const team = [drivers.alex, drivers.sofia];
  const summary = {
    total: team.length,
    go: team.filter(d => d.status === 'go').length,
    caution: team.filter(d => d.status === 'caution').length,
    noGo: team.filter(d => d.status === 'no_go').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Wednesday, Dec 17</p>
          <h1 className="text-2xl font-bold text-white">Team Overview</h1>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Add Session</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-indigo-500">
          <p className="text-gray-500 text-sm">Total Drivers</p>
          <p className="text-3xl font-bold text-white">{summary.total}</p>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <p className="text-gray-500 text-sm">Ready</p>
          <p className="text-3xl font-bold text-emerald-400">{summary.go}</p>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <p className="text-gray-500 text-sm">Caution</p>
          <p className="text-3xl font-bold text-amber-400">{summary.caution}</p>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <p className="text-gray-500 text-sm">Not Ready</p>
          <p className="text-3xl font-bold text-red-400">{summary.noGo}</p>
        </Card>
      </div>

      {/* Alerts */}
      {summary.caution > 0 && (
        <Card className="border-amber-500/50 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-amber-400 font-medium">Attention Required</p>
              <p className="text-gray-400 text-sm">{summary.caution} driver(s) need review before session</p>
            </div>
            <button className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-medium">Review</button>
          </div>
        </Card>
      )}

      {/* Driver List */}
      <div>
        <h2 className="text-white font-semibold mb-4">All Drivers</h2>
        <div className="space-y-3">
          {team.map((driver) => (
            <Card key={driver.id} onClick={() => onSelectDriver(driver.id)} className="hover:border-indigo-500/50">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  driver.status === 'go' ? 'bg-emerald-500/20' :
                  driver.status === 'caution' ? 'bg-amber-500/20' : 'bg-red-500/20'
                }`}>
                  {driver.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{driver.name}</span>
                    <span className="text-gray-500 text-sm">• {driver.age}y • {driver.category}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-gray-500 text-sm">Sleep: {driver.components.sleep.value}</span>
                    <span className="text-gray-500 text-sm">HRV: {driver.components.hrv.value}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    driver.status === 'go' ? 'text-emerald-400' :
                    driver.status === 'caution' ? 'text-amber-400' : 'text-red-400'
                  }`}>{driver.score}</div>
                  <StatusBadge status={driver.status} size="small" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// C7 - Coach Driver Profile
const CoachDriverProfile = ({ driver, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Driver Profile</h1>
      </div>

      {/* Header */}
      <Card className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
          driver.status === 'go' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
        }`}>
          {driver.avatar}
        </div>
        <div className="flex-1">
          <h2 className="text-white text-xl font-bold">{driver.name}</h2>
          <p className="text-gray-500">{driver.age} years • {driver.category} • {driver.experience}</p>
        </div>
        <div className="text-right">
          <ScoreRing score={driver.score} size={80} status={driver.status} />
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(driver.components).slice(0, 4).map(([key, comp]) => (
          <Card key={key} className="text-center py-3">
            <div className="text-gray-500 text-xs uppercase mb-1">{key}</div>
            <div className="text-white font-bold text-lg">{comp.value}</div>
            <div className="flex items-center justify-center gap-1">
              <span className={`text-sm ${comp.score >= 80 ? 'text-emerald-400' : comp.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                {comp.score}
              </span>
              <TrendIcon trend={comp.trend} />
            </div>
          </Card>
        ))}
      </div>

      {/* Test Results */}
      <Card>
        <h3 className="text-white font-medium mb-3">Recent Test Results</h3>
        <div className="space-y-3">
          {Object.entries(driver.tests).map(([key, test]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-lg">
                {key === 'reactionTime' ? '⚡' : key === 'gripStrength' ? '✊' : key === 'neckStrength' ? '💪' : '🫀'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-gray-500 text-xs">{test.date}</span>
                </div>
                <ProgressBar value={test.percentile} color="auto" height="h-1" />
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{test.value}</div>
                <div className="text-gray-500 text-xs">{test.percentile}th %ile</div>
              </div>
              <TrendIcon trend={test.trend} />
            </div>
          ))}
        </div>
      </Card>

      {/* Genetic Highlights */}
      <Card>
        <h3 className="text-white font-medium mb-3">Genetic Highlights</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Muscle Type</p>
            <p className="text-white">{driver.genetics.muscleType.slow}% Slow / {driver.genetics.muscleType.fast}% Fast</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Caffeine</p>
            <p className="text-white">{driver.genetics.metabolism.caffeine} Metabolizer</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Injury Risk</p>
            <p className={driver.genetics.injuries.achilles === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}>
              {driver.genetics.injuries.achilles}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-500 text-xs">CV Risk</p>
            <p className={driver.genetics.cardiovascular.risk === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}>
              {driver.genetics.cardiovascular.risk}
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-indigo-600 text-white py-3 rounded-xl font-medium">Record Test</button>
        <button className="bg-gray-800 text-white py-3 rounded-xl font-medium">Message Parent</button>
      </div>
    </div>
  );
};

// C12 - Coach Test Dashboard
const CoachTestDashboard = ({ onBack }) => {
  const testTypes = [
    { name: 'Reaction Time', icon: '⚡', lastTeam: '2 days ago', avgScore: 78 },
    { name: 'Grip Strength', icon: '✊', lastTeam: '1 week ago', avgScore: 74 },
    { name: 'Neck Strength', icon: '💪', lastTeam: '1 week ago', avgScore: 72 },
    { name: 'VO2 Max', icon: '🫀', lastTeam: '1 month ago', avgScore: 71 },
    { name: 'Cognitive Load', icon: '🧠', lastTeam: '3 days ago', avgScore: 76 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Testing & Assessment</h1>
      </div>

      <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-medium text-lg">
        + Record New Test
      </button>

      <Card>
        <h3 className="text-white font-medium mb-4">Test Categories</h3>
        <div className="space-y-3">
          {testTypes.map((test, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-2xl">{test.icon}</div>
              <div className="flex-1">
                <p className="text-white font-medium">{test.name}</p>
                <p className="text-gray-500 text-sm">Last tested: {test.lastTeam}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{test.avgScore}</p>
                <p className="text-gray-500 text-xs">Team avg</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-white font-medium mb-3">Upcoming Tests Due</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Sofia Chen - VO2 Max</span>
            <span className="text-amber-400 text-sm">Overdue by 5 days</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">Alex Martinez - Grip Strength</span>
            <span className="text-gray-500 text-sm">Due in 3 days</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// C16 - Session Planner
const SessionPlanner = ({ onBack }) => {
  const team = [drivers.alex, drivers.sofia];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Session Planner</h1>
      </div>

      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-400 font-medium">Next Session</p>
            <p className="text-white text-xl font-bold">Today, 2:00 PM</p>
            <p className="text-gray-400 text-sm">Track: Chennai Karting Circuit</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Weather</p>
            <p className="text-white text-lg">32°C ☀️</p>
            <p className="text-amber-400 text-xs">Heat protocol active</p>
          </div>
        </div>
      </Card>

      <h2 className="text-white font-semibold">Driver Readiness</h2>
      {team.map((driver) => (
        <Card key={driver.id} className={driver.status === 'caution' ? 'border-amber-500/30' : ''}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              driver.status === 'go' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
            }`}>
              {driver.avatar}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{driver.name}</p>
              <p className="text-gray-500 text-sm">
                {driver.status === 'go' ? 'Ready for full intensity' : 'Recommended: Reduced intensity'}
              </p>
            </div>
            <StatusBadge status={driver.status} size="small" />
          </div>
          {driver.status === 'caution' && (
            <div className="mt-3 p-3 bg-amber-500/10 rounded-lg">
              <p className="text-amber-400 text-sm">⚠️ Limiting factors: Sleep ({driver.components.sleep.value}), Fatigue ({driver.components.fatigue.value})</p>
              <p className="text-gray-400 text-xs mt-1">Suggestion: Max 20 laps, extra hydration breaks</p>
            </div>
          )}
        </Card>
      ))}

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-indigo-600 text-white py-3 rounded-xl font-medium">Start Session</button>
        <button className="bg-gray-800 text-white py-3 rounded-xl font-medium">Edit Plan</button>
      </div>
    </div>
  );
};

// === PARENT SCREENS ===

// P3 - Parent Dashboard
const ParentDashboard = ({ child, onNavigate }) => {
  const statusConfig = {
    go: { emoji: '✅', title: 'READY TO RACE', desc: 'All indicators show they\'re ready for training today.' },
    caution: { emoji: '⚠️', title: 'USE CAUTION', desc: 'Some factors need attention. Lighter session recommended.' },
    no_go: { emoji: '🛑', title: 'REST DAY', desc: 'Rest is recommended to prevent injury or burnout.' }
  };
  const s = statusConfig[child.status];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-4xl">
          🏁
        </div>
        <h1 className="text-2xl font-bold text-white">{child.name}'s Status</h1>
        <p className="text-gray-500 text-sm">Updated {child.lastUpdate}</p>
      </div>

      {/* Main Status */}
      <Card className={`text-center py-8 ${
        child.status === 'go' ? 'border-emerald-500/50 bg-emerald-950/20' :
        child.status === 'caution' ? 'border-amber-500/50 bg-amber-950/20' :
        'border-red-500/50 bg-red-950/20'
      }`}>
        <div className="text-6xl mb-4">{s.emoji}</div>
        <h2 className={`text-2xl font-bold uppercase tracking-wider mb-2 ${
          child.status === 'go' ? 'text-emerald-400' :
          child.status === 'caution' ? 'text-amber-400' : 'text-red-400'
        }`}>{s.title}</h2>
        <p className="text-gray-400">Readiness Score: <span className="text-white font-bold">{child.score}/100</span></p>
      </Card>

      {/* Explanation */}
      <Card>
        <h3 className="text-white font-medium mb-2">What does this mean?</h3>
        <p className="text-gray-400 text-sm">{s.desc}</p>
        {child.status === 'caution' && (
          <div className="mt-3 p-3 bg-amber-500/10 rounded-lg">
            <p className="text-amber-400 text-sm">
              ⚠️ Main concerns: Sleep was {child.components.sleep.value} (target: {child.components.sleep.target}), 
              Fatigue level is elevated ({child.components.fatigue.value})
            </p>
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center py-4">
          <div className="text-2xl mb-2">🌙</div>
          <div className="text-white text-xl font-bold">{child.components.sleep.value}</div>
          <div className="text-gray-500 text-xs">Sleep last night</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl mb-2">🥗</div>
          <div className="text-white text-xl font-bold">{child.components.nutrition.value}</div>
          <div className="text-gray-500 text-xs">Nutrition compliance</div>
        </Card>
      </div>

      {/* Actions */}
      {child.status !== 'go' && (
        <button 
          onClick={() => onNavigate('acknowledge')}
          className={`w-full py-4 rounded-xl font-medium ${
            child.status === 'caution' ? 'bg-amber-500 text-black' : 'bg-red-500 text-white'
          }`}
        >
          Acknowledge Status
        </button>
      )}

      <Card className="flex items-center gap-3">
        <span className="text-xl">ℹ️</span>
        <p className="text-gray-500 text-xs">
          KartIQ monitors sleep, recovery, and nutrition to help keep junior drivers safe. Always trust your judgment as a parent.
        </p>
      </Card>
    </div>
  );
};

// P7 - Parent Acknowledge Status
const ParentAcknowledge = ({ child, onBack, onComplete }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h1 className="text-xl font-bold text-white">Acknowledge Status</h1>
      </div>

      <Card className="border-amber-500/50 bg-amber-950/20 py-6 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-amber-400 text-xl font-bold mb-2">CAUTION Status</h2>
        <p className="text-white text-2xl font-bold">{child.score}/100</p>
      </Card>

      <Card>
        <h3 className="text-white font-medium mb-3">Limiting Factors Today</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Sleep Duration</span>
            <span className="text-amber-400">{child.components.sleep.value} (target: {child.components.sleep.target})</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Fatigue Level</span>
            <span className="text-amber-400">{child.components.fatigue.value} ({child.components.fatigue.label})</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">HRV Recovery</span>
            <span className="text-amber-400">{child.components.hrv.value} (baseline: {child.components.hrv.baseline})</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-white font-medium mb-3">Recommendations</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-amber-400">•</span>
            Reduce session intensity by 30-50%
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">•</span>
            Increase hydration breaks
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">•</span>
            Monitor for signs of fatigue during session
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">•</span>
            Prioritize early bedtime tonight
          </li>
        </ul>
      </Card>

      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl">
        <input 
          type="checkbox" 
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="w-5 h-5 mt-1 rounded bg-gray-700 border-gray-600 text-amber-500"
        />
        <p className="text-gray-300 text-sm">
          I acknowledge that {child.name} has a CAUTION status today. I understand the recommendations and will 
          ensure appropriate supervision during any training activity.
        </p>
      </div>

      <button 
        onClick={onComplete}
        disabled={!acknowledged}
        className={`w-full py-4 rounded-xl font-medium transition-colors ${
          acknowledged ? 'bg-amber-500 text-black' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        Confirm Acknowledgment
      </button>
    </div>
  );
};

// === MAIN APP ===
const KartIQPrototype = () => {
  const [role, setRole] = useState('driver');
  const [driverId, setDriverId] = useState('alex');
  const [screen, setScreen] = useState('home');

  const driver = drivers[driverId];

  const navigate = (newScreen) => setScreen(newScreen);
  const goHome = () => setScreen('home');

  // Render current screen based on role and screen state
  const renderScreen = () => {
    if (role === 'driver') {
      switch (screen) {
        case 'home': return <DriverHome driver={driver} onNavigate={navigate} />;
        case 'breakdown': return <ScoreBreakdown driver={driver} onBack={goHome} />;
        case 'checkin': return <MorningCheckIn driver={driver} onBack={goHome} onComplete={goHome} />;
        case 'nutrition': return <NutritionDashboard driver={driver} onNavigate={navigate} />;
        case 'meals': return <AIMealSuggestions driver={driver} onBack={() => navigate('nutrition')} />;
        case 'supplements': return <SupplementDashboard driver={driver} onNavigate={navigate} />;
        case 'supplementRecs': return <AISupplementRecs driver={driver} onBack={() => navigate('supplements')} />;
        case 'genetics': return <GeneticOverview driver={driver} onBack={goHome} />;
        case 'upload': return <UploadGeneticReport onBack={goHome} onComplete={() => navigate('genetics')} />;
        default: return <DriverHome driver={driver} onNavigate={navigate} />;
      }
    } else if (role === 'coach') {
      switch (screen) {
        case 'home': return <CoachTeamDashboard onSelectDriver={(id) => { setDriverId(id); navigate('driverProfile'); }} />;
        case 'driverProfile': return <CoachDriverProfile driver={driver} onBack={goHome} />;
        case 'tests': return <CoachTestDashboard onBack={goHome} />;
        case 'session': return <SessionPlanner onBack={goHome} />;
        default: return <CoachTeamDashboard onSelectDriver={(id) => { setDriverId(id); navigate('driverProfile'); }} />;
      }
    } else if (role === 'parent') {
      switch (screen) {
        case 'home': return <ParentDashboard child={driver} onNavigate={navigate} />;
        case 'acknowledge': return <ParentAcknowledge child={driver} onBack={goHome} onComplete={goHome} />;
        default: return <ParentDashboard child={driver} onNavigate={navigate} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <header className="bg-[#0a0a0f] border-b border-gray-800 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              KartIQ
            </span>
            <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-xs">PROTOTYPE</span>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-gray-900 rounded-lg p-1">
            <NavButton active={role === 'driver'} onClick={() => { setRole('driver'); setScreen('home'); }}>
              🏎️ Driver
            </NavButton>
            <NavButton active={role === 'coach'} onClick={() => { setRole('coach'); setScreen('home'); }}>
              👨‍🏫 Coach
            </NavButton>
            <NavButton active={role === 'parent'} onClick={() => { setRole('parent'); setScreen('home'); }}>
              👪 Parent
            </NavButton>
          </div>

          {/* Driver Selector (for demo) */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Viewing:</span>
            <select 
              value={driverId} 
              onChange={(e) => setDriverId(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm border border-gray-700"
            >
              <option value="alex">Alex (Fit)</option>
              <option value="sofia">Sofia (Moderate Risk)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Navigation (for Driver) */}
      {role === 'driver' && (
        <nav className="bg-[#0a0a0f] border-b border-gray-800 px-4 py-2 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex gap-2">
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'nutrition', label: '🥗 Nutrition' },
              { id: 'supplements', label: '💊 Supplements' },
              { id: 'genetics', label: '🧬 Genetics' },
              { id: 'upload', label: '📄 Upload Report' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setScreen(nav.id)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  screen === nav.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Coach Navigation */}
      {role === 'coach' && (
        <nav className="bg-[#0a0a0f] border-b border-gray-800 px-4 py-2 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex gap-2">
            {[
              { id: 'home', label: '📊 Team Overview' },
              { id: 'tests', label: '📋 Testing' },
              { id: 'session', label: '📅 Session Planner' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setScreen(nav.id)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  screen === nav.id || (screen === 'driverProfile' && nav.id === 'home') 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 lg:max-w-4xl">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm text-gray-500">
        💡 Interactive prototype • Switch roles and drivers above
      </footer>
    </div>
  );
};

export default KartIQPrototype;
