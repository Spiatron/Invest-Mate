import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Charges = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5'}}>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Title level={4} style={{ textAlign: 'start' }}>
                        Securities/Commodities transaction tax
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Transaction/Turnover Charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        BSE has revised transaction charges in XC, XD, XT, Z, and ZP groups to ₹10,000 per crore <br /> w.e.f 01.01.2016. (XC and XD groups have been merged into a new group <br />X w.e.f 01.12.2017)
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Call & trade
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Stamp charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        NRI brokerage charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        <li>₹100 per order for futures and options.</li>
                        <li>For a non-PIS account, 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
                        <li>For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                        <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Account with debit balance
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Charges for Investor's Protection Fund Trust (IPFT) by NSE
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        <li>  Equity and Futures - ₹10 per crore + GST of the traded value.</li>
                        <li>Options - ₹50 per crore + GST traded value (premium value).</li>
                        <li>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
                    </Paragraph>
                </Col>


                <Col xs={24} md={12}>
                    <Title level={4} style={{ textAlign: 'start' }}>
                        GST
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Tax levied by the government on the services rendered. 18% of (brokerage + SEBI charges + transaction charges)
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        SEBI Charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        DP (Depository participant) charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        ₹13 + GST per scrip (irrespective of quantity), on the day, is debited from the trading account when stocks are sold. This is charged by the depository (CDSL) and depository participant (Zerodha).
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction.
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Debit transactions of mutual funds & bonds get an additional discount of ₹0.25.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Pledging charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        ₹30 + GST per pledge request per ISIN.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        AMC (Account maintenance charges)
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA,
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'start' }}>
                        For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC,
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Corporate action order charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        ₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Off-market transfer charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        ₹25 or 0.03% of the transfer value (whichever is higher).
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Physical CMR request
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Payment gateway charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        ₹9 + GST (Not levied on transfers done via UPI)
                    </Paragraph>

                    <Title level={4} style={{ textAlign: 'start' }}>
                        Delayed Payment Charges
                    </Title>
                    <Paragraph style={{ textAlign: 'start' }}>
                        Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account.
                    </Paragraph>
                </Col>
                {/* Disclaimer section at the bottom */}
                <Col xs={24} md={24}>
                    <div style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '10px' }}>
                        <Title level={4} style={{ textAlign: 'start', margin: '0' }}>
                            Disclaimer
                        </Title>
                        <Paragraph style={{ fontSize: '14px', textAlign: 'start', marginTop: '8px' }}>
                            For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.
                        </Paragraph>
                    </div>
                </Col>

            </Row>

        </div>
    );
};

export default Charges;
