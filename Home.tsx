import React, { useState } from 'react';
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonRange,
    IonLabel, IonButton, IonButtons, IonMenuButton, IonIcon, IonMenu, IonList, IonItem
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import './Home.css';

// Registering ChartJS components for Pie Chart
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const Home: React.FC = () => {
    const [investment, setInvestment] = useState(25000);
    const [returnRate, setReturnRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    // Function to calculate SIP (Systematic Investment Plan)
    const calculateSIP = () => {
        let P = investment; // Monthly investment amount
        let i = returnRate / 100 / 12; // Monthly interest rate
        let n = timePeriod * 12; // Total number of months

        let futureValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        let invested = P * n;
        let estimatedReturns = futureValue - invested;

        return {
            investedAmount: invested.toLocaleString("en-IN"),
            returns: Math.round(estimatedReturns).toLocaleString("en-IN"),
            totalValue: Math.round(futureValue).toLocaleString("en-IN")
        };
    };

    const { investedAmount, returns, totalValue } = calculateSIP();

    const data = {
        labels: ['Invested Amount', 'Est. Returns'],
        datasets: [
            {
                data: [investment * timePeriod * 12, parseFloat(returns.replace(/,/g, ''))],
                backgroundColor: ['#A0A0FF', '#4040FF'],
                borderColor: ['#7070FF', '#2020FF'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <IonMenu contentId="main-content" side="end">
                <IonContent>
                    <div style={{ padding: "20px", textAlign: "center" }}>
                        <h3>Simple & Free Investing</h3>
                        <IonButton expand="full" color="success">LOGIN/REGISTER</IonButton>
                    </div>
                    {/* Menu Items */}
                    <IonList>
                        <IonItem><IonLabel>Filter Stocks</IonLabel></IonItem>
                        <IonItem><IonLabel>Filter Mutual Funds</IonLabel></IonItem>
                        <IonItem><IonLabel>Filter US Stocks</IonLabel></IonItem>
                        <IonItem><IonLabel>Smart Save</IonLabel></IonItem>
                        <IonItem><IonLabel>Compare Funds</IonLabel></IonItem>
                        <IonItem><IonLabel>Credit</IonLabel></IonItem>
                        <IonItem><IonLabel>View in App</IonLabel></IonItem>
                        <IonItem><IonLabel>Help and Support</IonLabel></IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>

            {/* Main Page Content */}
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <img 
                                    src="https://cdn.freelogovectors.net/wp-content/uploads/2023/11/groww_logo-freelogovectors.net_.png" 
                                    height="30" 
                                    width="40" 
                                    alt="Groww Logo"
                                />
                                <span>Groww</span>
                            </div>
                        </IonTitle>

                        <IonButtons slot="end">
                            <IonButton>
                                <IonIcon icon={searchOutline} />
                            </IonButton>
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <h2>SIP Calculator</h2>

                    <div className="toggle-buttons">
                        <IonButton fill="solid" color="primary">SIP</IonButton>
                        <IonButton fill="outline">Lumpsum</IonButton>
                    </div>

                    <IonLabel>Monthly Investment</IonLabel>
                    <IonRange 
                        min={1000} 
                        max={100000} 
                        value={investment} 
                        onIonChange={(e) => setInvestment(e.detail.value as number)} 
                    />
                    <p>₹{investment.toLocaleString()}</p>

                    <IonLabel>Expected Return Rate (p.a)</IonLabel>
                    <IonRange 
                        min={5} 
                        max={20} 
                        value={returnRate} 
                        onIonChange={(e) => setReturnRate(e.detail.value as number)} 
                    />
                    <p>{returnRate}%</p>

                    <IonLabel>Time Period</IonLabel>
                    <IonRange 
                        min={1} 
                        max={30} 
                        value={timePeriod} 
                        onIonChange={(e) => setTimePeriod(e.detail.value as number)} 
                    />
                    <p>{timePeriod} Yr</p>

                    {/* Results Display Section */}
                    <div className="results">
                        <p><strong>Invested Amount:</strong> ₹{investedAmount}</p>
                        <p><strong>Est. Returns:</strong> ₹{returns}</p>
                        <p><strong>Total Value:</strong> ₹{totalValue}</p>
                    </div>

                    <div className="chart-container" style={{ height: '300px', width: '100%' }}>
                        <Pie data={data} />
                    </div>

                    <IonButton expand="full" color="success">START SIP</IonButton>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Home;
