import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Video, Phone, Mail, MapPin, Star, Clock, Search, Filter } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  availability: 'available' | 'busy' | 'offline';
  location: string;
  image: string;
  languages: string[];
  nextAvailable: string;
  videoCall: boolean;
  phoneCall: boolean;
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      experience: 12,
      rating: 4.9,
      reviews: 156,
      availability: 'available',
      location: 'New York, NY',
      image: 'https://static.wixstatic.com/media/e48e2f_b018e7044fca4a98926e303c3c3826cf~mv2.png?originWidth=128&originHeight=128',
      languages: ['English', 'Spanish'],
      nextAvailable: 'Today, 2:00 PM',
      videoCall: true,
      phoneCall: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Psychiatrist',
      experience: 15,
      rating: 4.8,
      reviews: 203,
      availability: 'available',
      location: 'San Francisco, CA',
      image: 'https://static.wixstatic.com/media/e48e2f_e565067cff6c4143b095a17636c379e8~mv2.png?originWidth=128&originHeight=128',
      languages: ['English', 'Mandarin'],
      nextAvailable: 'Tomorrow, 10:00 AM',
      videoCall: true,
      phoneCall: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Therapist',
      experience: 8,
      rating: 4.7,
      reviews: 98,
      availability: 'busy',
      location: 'Los Angeles, CA',
      image: 'https://static.wixstatic.com/media/e48e2f_50fb2e13e9a04c229e0a6a15719fb949~mv2.png?originWidth=128&originHeight=128',
      languages: ['English', 'Spanish', 'French'],
      nextAvailable: 'Jan 25, 3:00 PM',
      videoCall: true,
      phoneCall: false,
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Counselor',
      experience: 10,
      rating: 4.9,
      reviews: 142,
      availability: 'available',
      location: 'Chicago, IL',
      image: 'https://static.wixstatic.com/media/e48e2f_a77090257f5844729c1bbdf496b1060b~mv2.png?originWidth=128&originHeight=128',
      languages: ['English'],
      nextAvailable: 'Today, 4:30 PM',
      videoCall: true,
      phoneCall: true,
    },
    {
      id: '5',
      name: 'Dr. Priya Patel',
      specialty: 'Clinical Psychologist',
      experience: 14,
      rating: 5.0,
      reviews: 187,
      availability: 'offline',
      location: 'Boston, MA',
      image: 'https://static.wixstatic.com/media/e48e2f_23bc85d784fd4f789a079098c9b69e67~mv2.png?originWidth=128&originHeight=128',
      languages: ['English', 'Hindi', 'Gujarati'],
      nextAvailable: 'Jan 26, 9:00 AM',
      videoCall: true,
      phoneCall: true,
    },
    {
      id: '6',
      name: 'Dr. David Kim',
      specialty: 'Psychiatrist',
      experience: 18,
      rating: 4.8,
      reviews: 221,
      availability: 'available',
      location: 'Seattle, WA',
      image: 'https://static.wixstatic.com/media/e48e2f_cfa8958baf9f425788f0d9525a643a63~mv2.png?originWidth=128&originHeight=128',
      languages: ['English', 'Korean'],
      nextAvailable: 'Today, 1:00 PM',
      videoCall: true,
      phoneCall: true,
    },
  ];

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Available Now</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Busy</Badge>;
      case 'offline':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Offline</Badge>;
      default:
        return null;
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
    const matchesAvailability = availabilityFilter === 'all' || doctor.availability === availabilityFilter;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary/10 to-highlightyellow/10 py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
                Doctors Directory
              </h1>
              <p className="font-paragraph text-xl text-foreground/80 max-w-3xl">
                Connect with licensed mental health professionals. Video calls, phone consultations, and in-person appointments available.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="w-full py-8 bg-white border-b">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 font-paragraph"
                />
              </div>
              
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="h-12 font-paragraph">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Clinical Psychologist">Clinical Psychologist</SelectItem>
                  <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                  <SelectItem value="Therapist">Therapist</SelectItem>
                  <SelectItem value="Counselor">Counselor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="h-12 font-paragraph">
                  <SelectValue placeholder="All Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Doctors List */}
        <section className="w-full py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="mb-6">
              <p className="font-paragraph text-foreground/60">
                Showing {filteredDoctors.length} of {doctors.length} doctors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:shadow-xl transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="font-heading text-xl mb-1">
                            {doctor.name}
                          </CardTitle>
                          <CardDescription className="font-paragraph text-sm">
                            {doctor.specialty}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {getAvailabilityBadge(doctor.availability)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-heading">{doctor.rating}</span>
                          <span className="font-paragraph text-foreground/60">
                            ({doctor.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-foreground/70">
                          <MapPin className="w-4 h-4" />
                          <span className="font-paragraph">{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Clock className="w-4 h-4" />
                          <span className="font-paragraph">Next: {doctor.nextAvailable}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="font-paragraph text-xs text-foreground/60 mb-2">
                          {doctor.experience} years experience
                        </p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          Languages: {doctor.languages.join(', ')}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {doctor.videoCall && (
                          <Button
                            variant="default"
                            className="w-full h-10"
                            disabled={doctor.availability === 'offline'}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </Button>
                        )}
                        {doctor.phoneCall && (
                          <Button
                            variant="outline"
                            className="w-full h-10"
                            disabled={doctor.availability === 'offline'}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        )}
                      </div>

                      <Button variant="outline" className="w-full h-10">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="font-paragraph text-lg text-foreground/60">
                  No doctors found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <Video className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="font-heading text-xl">Video Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-foreground/80">
                    Connect with doctors from anywhere through secure video calls
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Phone className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="font-heading text-xl">Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-foreground/80">
                    Prefer voice calls? Many doctors offer phone consultations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Clock className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="font-heading text-xl">Flexible Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-sm text-foreground/80">
                    Book appointments that fit your schedule, including evenings and weekends
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
