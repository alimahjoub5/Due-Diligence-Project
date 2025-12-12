import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Eye } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <SEO
                title="Privacy Policy | Global Data Protection Compliance"
                description="Checkmate Security's privacy policy. Learn how we protect your data in compliance with GDPR and international data protection regulations."
                keywords="privacy policy, GDPR, data protection, privacy statement, international compliance"
            />

            {/* Header */}
            <div className="bg-primary text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                        <p className="text-xl text-gray-300">
                            Your data protection rights and how we handle personal information.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-sm shadow-sm p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-sm text-gray-500 mb-8">
                            Last Updated: January 2025
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-accent" />
                                1. Introduction
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Checkmate Security ("we," "our," or "us") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, process, and protect your personal information in accordance with the General Data Protection Regulation (GDPR) and other applicable international data protection standards.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                As a global background screening service provider, we act as a data processor on behalf of our corporate clients (data controllers) and handle candidate data with the highest standards of security and compliance.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-accent" />
                                2. Data Controller and Processor
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Data Controller:</strong> Your employer or potential employer (our client) is the data controller responsible for determining the purposes and means of processing your personal data for employment screening purposes.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Data Processor:</strong> Checkmate Security acts as a data processor, conducting background checks and verifications on behalf of our clients, strictly in accordance with their instructions and applicable data protection laws.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-accent" />
                                3. Types of Personal Data We Process
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We process the following categories of personal data, only when necessary and with your explicit consent:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li><strong>Identity Data:</strong> Full name, date of birth, identification document numbers (passport, ID card)</li>
                                <li><strong>Contact Information:</strong> Email address, phone number, residential address</li>
                                <li><strong>Employment History:</strong> Previous employers, job titles, dates of employment, references</li>
                                <li><strong>Educational Qualifications:</strong> Degrees, certifications, academic institutions, graduation dates</li>
                                <li><strong>Professional Licenses:</strong> Professional certifications, licenses, registrations</li>
                                <li><strong>Legal Information:</strong> Criminal record certificates when provided by you, insolvency register checks (where legally permissible)</li>
                                <li><strong>Public Records:</strong> Information from publicly available sources, media searches (conducted in compliance with local laws)</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                We do not process special categories of personal data (sensitive data) unless explicitly required by law or with your explicit consent for a specific purpose.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-accent" />
                                4. Legal Basis for Processing
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Under GDPR and similar frameworks, we process your personal data based on the following legal grounds:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li><strong>Consent:</strong> You have given explicit consent to the processing of your personal data for background screening purposes</li>
                                <li><strong>Legitimate Interest:</strong> The employer has a legitimate interest in verifying candidate qualifications and suitability for employment</li>
                                <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with legal obligations (e.g., regulatory requirements for certain roles)</li>
                                <li><strong>Contract Performance:</strong> Processing is necessary for the performance of a contract to which you are a party (employment contract)</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                All processing activities are conducted in accordance with the principle of data minimization, meaning we only collect and process data that is necessary and relevant for the specific screening purpose.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">5. How We Use Your Data</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use your personal data solely for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li>Verifying your identity and right to work</li>
                                <li>Validating educational qualifications and professional credentials</li>
                                <li>Confirming employment history and references</li>
                                <li>Conducting legal and integrity checks (with your consent)</li>
                                <li>Preparing background screening reports for our clients (your potential employer)</li>
                                <li>Complying with legal and regulatory requirements</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                We do not use your data for marketing purposes, and we do not sell or share your data with third parties except as necessary to perform the background check services or as required by law.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">6. Data Storage and Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Data Location:</strong> All personal data is stored and processed within secure jurisdictions to ensure compliance with data residency requirements. We utilize standard contractual clauses where necessary for cross-border transfers.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Security Measures:</strong> We implement industry-standard technical and organizational measures to protect your personal data, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Regular security audits and assessments</li>
                                <li>Staff training on data protection</li>
                                <li>Secure data centers with physical security measures</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Retention Period:</strong> We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Typically, background check reports are retained for a maximum of 24 months, after which they are securely deleted.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                As a data subject, you typically have the following rights depending on your jurisdiction:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you</li>
                                <li><strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete data</li>
                                <li><strong>Right to Erasure:</strong> You can request deletion of your personal data under certain circumstances</li>
                                <li><strong>Right to Restrict Processing:</strong> You can request limitation of how we process your data</li>
                                <li><strong>Right to Data Portability:</strong> You can request transfer of your data to another service provider</li>
                                <li><strong>Right to Object:</strong> You can object to processing based on legitimate interests</li>
                                <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent at any time (note: this may affect the background check process)</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                To exercise these rights, please contact us at <a href="mailto:privacy@checkmatesis.com" className="text-accent hover:underline">privacy@checkmatesis.com</a>.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">8. Data Sharing and Third Parties</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We share your personal data only with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li><strong>Our Client (Your Employer):</strong> We provide background check reports to the employer who requested the screening</li>
                                <li><strong>Verification Sources:</strong> Educational institutions, previous employers, and other third parties necessary to verify the information you provided</li>
                                <li><strong>Service Providers:</strong> Trusted third-party service providers who assist us in operating our business (under strict confidentiality agreements)</li>
                                <li><strong>Legal Authorities:</strong> When required by law or court order</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                All third parties are contractually bound to protect your data and use it only for the specified purposes.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">9. Contact and Complaints</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-sm mb-4">
                                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:privacy@checkmatesis.com" className="text-accent hover:underline">privacy@checkmatesis.com</a></p>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">10. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
