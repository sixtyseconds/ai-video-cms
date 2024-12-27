import { Shield, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast Video Processing',
    description: 'Process and analyze videos in seconds with our advanced AI technology'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Seamless Collaboration',
    description: 'Work together with your team in real-time with powerful sharing features'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise-Grade Security',
    description: 'Your content is protected with industry-leading security measures'
  }
];

export function LoginFeatures() {
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold text-white mb-8">
        Transform your video workflow
      </h2>
      
      <div className="space-y-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}