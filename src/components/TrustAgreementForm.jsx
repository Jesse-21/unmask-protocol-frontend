import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import SignatureCanvas from 'react-signature-canvas';
import { 
  FileText, 
  Check, 
  X, 
  Download, 
  RefreshCw, 
  Fingerprint, 
  Lock, 
  Shield, 
  UserCheck,
  Calendar,
  Info,
  CreditCard
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const TrustAgreementForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRead, setHasRead] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [controlNumber, setControlNumber] = useState('');
  const [rugId, setRugId] = useState(''); 
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [userIdentityInfo, setUserIdentityInfo] = useState({
    fullName: '',
    idType: '',
    idNumber: '',
    address: '',
    isOver18: false,
    verificationId: '',
    authCode: '',
    verificationDate: ''
  });
  
  const [nameInput, setNameInput] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [signatureDate, setSignatureDate] = useState('');

  const signaturePad = useRef(null);

  const generateControlNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `AGR-${timestamp}-${random}`;
  };

  const truncateText = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  useEffect(() => {
    setControlNumber(generateControlNumber());
    
    if (location.state && location.state.identityData) {
      setUserIdentityInfo(location.state.identityData);
    } else {
      setUserIdentityInfo({
        fullName: 'John Doe',
        idType: 'Passport',
        idNumber: 'P123456789',
        address: '123 Blockchain St, Crypto City, CC 12345',
        isOver18: true,
        verificationId: 'ID-V-7891011',
        authCode: 'AUTH-123456',
        verificationDate: new Date().toLocaleDateString()
      });
    }
    
    if (location.state && location.state.rugId) {
      setRugId(location.state.rugId);
    } else {
      setRugId('RID-AB12CD34EF56');
    }
  }, [location]);

  const clearSignature = () => {
    signaturePad.current.clear();
    setAgreementSigned(false);
    setSignatureName('');
  };

  const handleSignAgreement = () => {
    if (signaturePad.current.isEmpty()) {
      toast.error('Please sign the agreement before submitting');
      return;
    }
    
    if (!nameInput.trim()) {
      toast.error('Please enter your full legal name for the signature');
      return;
    }
    
    setSignatureName(nameInput);
    setSignatureDate(new Date().toLocaleDateString());
    setAgreementSigned(true);
    toast.success('Agreement successfully signed!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasRead) {
      toast.error('Please confirm that you have read and agree to the terms');
      return;
    }
    
    if (!agreementSigned) {
      toast.error('Please sign the agreement before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Trust Agreement successfully submitted!', {
        description: `Your RugID (${rugId}) has been finalized and is now active.`
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error submitting agreement:', error);
      toast.error('Failed to submit agreement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadAgreement = () => {
    toast.info('This would download the agreement as a PDF in a production environment');
  };

  const trustAgreementText = `
**RugDox LLC User Agreement**

**Purpose & Commitment**

RugDox LLC's RugID system is designed to promote trust and protect communities by ensuring individuals act with integrity. The purpose of this system is to provide community members with confidence that those they interact with are accountable. By securely vaulting your data, RugDox LLC aims to deter malicious behavior while preserving your privacy and security. We prioritize your security and use advanced data protection methods to safeguard your information.

Your data will only be used if there is confirmed evidence linking your identity to activities that violate this Agreement. Our goal is not to punish, but to maintain a fair and trustworthy community.

---

**Integrity Commitment**

This Agreement is fundamentally based on integrity. While RugDox LLC's primary objective is to prevent fraud and crime specifically within Web3 industries (including crypto, NFTs, and digital asset-related ventures), the principles of trust and accountability apply more broadly. 

If a User is found to have engaged in fraudulent behavior outside the Web3 space — whether in traditional industries, financial schemes, or other misconduct — such actions inherently compromise the trust that this Agreement is designed to build. While such non-Web3-related fraudulent behavior may not automatically invalidate this Agreement, it reflects a clear violation of the trust expected of a Web3 community leader, project founder, or administrator. RugDox LLC reserves the right to take such violations into account when assessing the User's standing in the RugID system and the community.

---

**User Responsibilities and Liabilities**

2.1 **Truthful Information:** Users must provide truthful, accurate, and complete information. This includes, but is not limited to, verified address details, picture identification, and additional documentation as requested by RugDox LLC. Providing false information may result in penalties outlined herein.

2.2 **Commitment to Integrity:** Users agree to act in good faith and refrain from activities that could be perceived as fraudulent or harmful to their community. This includes actions that could result in financial loss or reputation damage to others.

2.3 **Fraud Prevention & Accountability:** RugDox LLC will only act to confirm and verify data when potential fraudulent activity is identified. Fraudulent activities include, but are not limited to, actions involving deception, misrepresentation, or misconduct by Web3 project owners, founders, or admins in crypto, NFTs, or other digital asset-related ventures. If the User is linked to verifiable fraudulent actions, the Company may collect and report relevant data to appropriate authorities or, in certain cases, publicly disclose data through the unMASK Protocol to warn affected parties. 

**Note:** This is not intended to assume guilt but to provide verifiable data that authorities may use in their investigations. For detailed information about the unMASK Protocol process, please reference our website once available.

2.4 **Indemnification:** Users agree to indemnify, defend, and hold harmless RugDox LLC from claims, liabilities, damages, or costs resulting from their breach of this Agreement or verified fraudulent activity.

---

**Data Collection and Security**

3.1 **Data Security Measures:** RugDox LLC protects your personal data using:

- A two-layer Hybrid Encryption followed by advanced post-quantum encryption.
- Offensive protection methods designed to ensure the vault's data integrity at all times.
- Industry-standard security protocols designed to minimize the risk of data breaches.

3.2 **User Assurance:** While RugDox LLC takes significant measures to protect your data, no security system is infallible. By agreeing to this Agreement, the User acknowledges these risks.

---

**Cancellation, Investigations & Data Use**

13.1 **No Right to Cancellation During Investigation:** To ensure the integrity of the unMASK Protocol, the User agrees they may not cancel or alter their RugID registration during an ongoing investigation if linked to suspected fraudulent activities. This measure is critical to protecting communities and ensuring due diligence in fraud prevention.

13.2 **Limited Right to Withdraw Consent:** The User understands that consent for data collection, processing, and storage may not be withdrawn once an investigation is activated or if such withdrawal would interfere with ongoing legal processes.

13.3 **Corrective Action in Case of Error:** Users have the right to submit evidence proving they were incorrectly linked to fraudulent activities. In such cases, RugDox LLC will promptly review the evidence, correct the record, and restore the User's standing in the community.

---

**User Bill of Rights**

To build user trust, RugDox LLC outlines the following rights for all users:

- **Transparency:** Users will be informed when their data is being reviewed or disclosed in accordance with the unMASK Protocol.
- **Correction of Errors:** Users have the right to present verified documentation to correct inaccuracies in the RugID system.
- **Security Updates:** RugDox LLC will provide regular security updates and notify users of changes to its data protection methods.
- **Clear Appeal Process:** If a User disagrees with an outcome linked to suspected fraudulent activity, they have the right to appeal the decision through a dedicated review process. Please note that in rare circumstances, law enforcement authorities may require RugDox LLC to provide all investigative information, including securely vaulted data, in compliance with applicable laws and regulations. Such requests are beyond our control and may limit or prevent our ability to proceed with the appeal process as outlined in this Agreement.
---

**Summary of Commitments**

By signing this Agreement, the User acknowledges that RugDox LLC is dedicated to building a safe, fraud-resistant environment that values fairness, accountability, and the protection of personal data. The User agrees to cooperate with the Company in maintaining these principles.

---

**IN WITNESS WHEREOF, the parties hereto have executed this User Agreement as of the date first above written.**

**RugDox LLC**
By: RugDox LLC
Date: ${new Date().toLocaleDateString()}

**User**
By ID Agent
ID-V: ${userIdentityInfo.verificationId}
Auth: ${userIdentityInfo.authCode}

By: ${signatureName || '_________________________'}
Name: ${signatureName || '_________________________'}
18+: ${userIdentityInfo.isOver18 ? 'Yes' : 'No'}
RugID: ${rugId}
Date: ${signatureDate || '_________________________'}
`;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          RugDox LLC User Agreement
        </CardTitle>
        <CardDescription>
          Please review the agreement carefully before signing. This is a legally binding document.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <Label className="text-lg">Identity Verification Record</Label>
              <Badge variant="outline" className="ml-auto">Verified</Badge>
            </div>
            <div className="border p-4 rounded-md bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Full Legal Name:</p>
                  <p className="text-sm">{userIdentityInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ID Type:</p>
                  <p className="text-sm">{userIdentityInfo.idType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ID Number:</p>
                  <p className="text-sm">{truncateText(userIdentityInfo.idNumber, 5)}***</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Verified Address:</p>
                  <p className="text-sm">{truncateText(userIdentityInfo.address, 20)}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">ID-V: {userIdentityInfo.verificationId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Verified on: {userIdentityInfo.verificationDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">Auth: {userIdentityInfo.authCode}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg">Agreement Terms</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleDownloadAgreement}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Agreement
              </Button>
            </div>
            <ScrollArea className="h-72 w-full border rounded-md p-4 bg-white text-black">
              <div className="whitespace-pre-line">
                {trustAgreementText}
              </div>
            </ScrollArea>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <Label className="text-lg">Agreement Information</Label>
            </div>
            <div className="border p-4 rounded-md bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Agreement Date:</p>
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">18+ Verification:</p>
                  <p className="text-sm">{userIdentityInfo.isOver18 ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">RugID: {rugId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Date: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono">Control #: {controlNumber}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              <Label className="text-lg">Your Signature</Label>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="signature-name">Your Full Legal Name</Label>
                <Input
                  id="signature-name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your full legal name"
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Please enter your name exactly as it appears on your legal ID
                </p>
              </div>
              
              <div className="border rounded-md bg-white p-1">
                <SignatureCanvas
                  ref={signaturePad}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'signature-canvas w-full'
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={clearSignature}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Signature
                </Button>
                <Button 
                  type="button" 
                  size="sm"
                  onClick={handleSignAgreement}
                  disabled={agreementSigned}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {agreementSigned ? 'Signed' : 'Sign Agreement'}
                </Button>
              </div>
            </div>
          </div>
          
          {agreementSigned && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <Label className="text-lg">Signed Agreement Details</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Signatory Name:</p>
                  <p className="text-sm">{signatureName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Signature Date:</p>
                  <p className="text-sm">{signatureDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">RugID:</p>
                  <p className="text-sm font-mono">{rugId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Agreement Control Number:</p>
                  <p className="text-sm font-mono">{controlNumber}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-start space-x-2 pt-4 border-t">
            <Checkbox 
              id="agreement-confirmation" 
              checked={hasRead}
              onCheckedChange={(checked) => setHasRead(checked)}
            />
            <Label 
              htmlFor="agreement-confirmation" 
              className="font-normal"
            >
              I confirm that I have read and agree to the RugDox LLC User Agreement terms, and that all identity information I have provided is accurate and truthful. I understand that this is a legally binding document.
            </Label>
          </div>
          
          {agreementSigned && (
            <Alert className="bg-green-100 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Agreement Signed</AlertTitle>
              <AlertDescription>
                Your signature has been recorded. Please submit the form to finalize the User Agreement and complete your RugID registration.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between bg-muted/50">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/register')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !hasRead || !agreementSigned}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Signed Agreement'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TrustAgreementForm;
