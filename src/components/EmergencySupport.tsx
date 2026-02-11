import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Phone, MessageCircle, X, MapPin, Clock } from 'lucide-react';

interface EmergencySupportProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencySupport({ isOpen, onClose }: EmergencySupportProps) {
  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support',
      type: 'crisis',
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Text-based crisis support',
      type: 'text',
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Mental health and substance abuse',
      type: 'support',
    },
    {
      name: 'Emergency Services',
      phone: '911',
      description: 'Immediate emergency assistance',
      type: 'emergency',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-red-500 shadow-2xl">
              <CardHeader className="bg-red-50 border-b-2 border-red-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="font-heading text-2xl text-red-900">
                        Emergency Support
                      </CardTitle>
                      <CardDescription className="font-paragraph text-red-700">
                        Immediate help is available 24/7
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-red-900 hover:bg-red-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Crisis Warning */}
                <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                  <p className="font-paragraph text-sm text-red-900 leading-relaxed">
                    <strong className="font-heading">If you're in immediate danger or having thoughts of harming yourself or others, please call 911 or go to your nearest emergency room.</strong>
                  </p>
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl text-foreground">Crisis Hotlines</h3>
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-heading text-lg text-foreground mb-1">
                                {contact.name}
                              </h4>
                              <p className="font-paragraph text-sm text-foreground/60 mb-2">
                                {contact.description}
                              </p>
                              <div className="flex items-center gap-2">
                                {contact.type === 'text' ? (
                                  <MessageCircle className="w-4 h-4 text-primary" />
                                ) : (
                                  <Phone className="w-4 h-4 text-primary" />
                                )}
                                <span className="font-heading text-lg text-primary">
                                  {contact.phone}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant={contact.type === 'emergency' ? 'default' : 'outline'}
                              className="h-10"
                              onClick={() => {
                                if (contact.type !== 'text') {
                                  window.location.href = `tel:${contact.phone.replace(/[^0-9]/g, '')}`;
                                }
                              }}
                            >
                              {contact.type === 'text' ? 'Text' : 'Call Now'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Resources */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl text-foreground">Other Resources</h3>
                  
                  <Card className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-heading text-base mb-1">Find Nearby Help</h4>
                          <p className="font-paragraph text-sm text-foreground/80 mb-3">
                            Locate emergency rooms and crisis centers near you
                          </p>
                          <Button variant="outline" size="sm">
                            Find Locations
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-heading text-base mb-1">Schedule Urgent Appointment</h4>
                          <p className="font-paragraph text-sm text-foreground/80 mb-3">
                            Connect with a mental health professional today
                          </p>
                          <Button variant="outline" size="sm">
                            View Available Doctors
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Safety Tips */}
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-heading text-base text-blue-900 mb-2">
                    While You Wait for Help:
                  </h4>
                  <ul className="space-y-2 font-paragraph text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Stay in a safe environment with others if possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Remove any items that could be used for self-harm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Try deep breathing exercises to help calm yourself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Reach out to a trusted friend or family member</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
