@@ .. @@
 import React, { useState } from 'react';
 import { motion } from 'framer-motion';
+import { toast } from 'sonner';
 import { 
@@ .. @@
     setIsSubmitted(true);
     setIsSubmitting(false);
     
+    toast.success('Message sent successfully!', {
+      description: 'We\'ll get back to you within 24 hours.'
+    });
+    
     // Reset form after 3 seconds
     setTimeout(() => {
       setIsSubmitted(false);