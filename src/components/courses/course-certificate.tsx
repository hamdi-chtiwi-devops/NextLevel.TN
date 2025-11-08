'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { type Course } from '@/lib/types';
import { Award } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

export function CourseCertificate({ course }: { course: Course }) {
  const user = useUser();

  const generateCertificate = async () => {
    if (!user) return;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([792, 612]); // US Letter landscape
    const { width, height } = page.getSize();
    
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Background
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.94, 0.95, 0.98), // light blue
    });

    // Border
    page.drawRectangle({
        x: 20,
        y: 20,
        width: width - 40,
        height: height - 40,
        borderColor: rgb(0.247, 0.317, 0.709), // primary blue
        borderWidth: 2,
    });


    // Title
    page.drawText('CERTIFICATE OF COMPLETION', {
      x: 50,
      y: height - 100,
      font: helveticaBoldFont,
      size: 40,
      color: rgb(0.247, 0.317, 0.709), // primary blue
    });

    // Subtitle
    page.drawText('This certificate is proudly presented to', {
        x: 50,
        y: height - 160,
        font: helveticaFont,
        size: 18,
        color: rgb(0.4, 0.4, 0.4),
      });

    // User Name
    const userName = user.displayName || 'Anonymous';
    const userNameWidth = helveticaBoldFont.widthOfTextAtSize(userName, 36);
    page.drawText(userName, {
        x: (width - userNameWidth) / 2,
        y: height - 230,
        font: helveticaBoldFont,
        size: 36,
        color: rgb(0.1, 0.1, 0.1),
    });

    // Course completion text
    page.drawText('For successfully completing the course', {
        x: 50,
        y: height - 280,
        font: helveticaFont,
        size: 18,
        color: rgb(0.4, 0.4, 0.4),
    });

    // Course Title
    const courseTitle = course.title;
    const courseTitleWidth = helveticaBoldFont.widthOfTextAtSize(courseTitle, 28);
    page.drawText(courseTitle, {
        x: (width - courseTitleWidth) / 2,
        y: height - 330,
        font: helveticaBoldFont,
        size: 28,
        color: rgb(0.1, 0.1, 0.1),
    });

    // Date
    const completionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      page.drawText(`Date: ${completionDate}`, {
        x: 50,
        y: 100,
        font: helveticaFont,
        size: 14,
      });

    // Instructor Signature
    page.drawText('Instructor Signature', {
        x: width - 250,
        y: 100,
        font: helveticaFont,
        size: 14,
      });
    page.drawLine({
        start: { x: width - 250, y: 95 },
        end: { x: width - 50, y: 95 },
        thickness: 1,
        color: rgb(0, 0, 0),
    });
    page.drawText(course.instructor, {
        x: width - 250,
        y: 75,
        font: helveticaBoldFont,
        size: 16,
      });


    const pdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'Certificate.pdf');
  };

  return (
    <Button variant="outline" size="lg" onClick={generateCertificate} disabled={!user}>
      <Award className="mr-2 h-5 w-5" />
      Get Certificate
    </Button>
  );
}
