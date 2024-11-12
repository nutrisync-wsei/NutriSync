'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Icon from '@/assets/Icon';
import Avatar from '@/assets/images/Avatar.jpg';
import CircleLimeImage from '@/assets/images/CircleLime.png';
import CircleWhiteImage from '@/assets/images/CircleWhite.png';
import Text from '@/components/Text';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  const settingsItems = [
    {
      path: '/profile-info',
      label: 'Personal information',
      Icon: Icon.SettingsProfile,
    },
    { path: '/subscription', label: 'Subscription', Icon: Icon.Subscription },
    {
      path: '/notifications',
      label: 'Notifications',
      Icon: Icon.Notifications,
    },
    { path: '/About', label: 'About', Icon: Icon.About },
    {
      path: '/support',
      label: 'Support',
      Icon: Icon.Support,
    },
    { path: '/logout', label: 'Logout', Icon: Icon.Logout },
  ];

  return (
    <Container>
      <AuthInfo>
        <Text.H3>{authUser?.username}</Text.H3>
        <StyledImage alt="avatar" width={120} height={120} src={Avatar} />
        <Circle src={CircleLimeImage} alt="Wave lime" />
        <CircleWhite src={CircleWhiteImage} alt="White wave" />
      </AuthInfo>
      <Settings>
        <TopSettings>
          {settingsItems.map((item) => (
            <SettingsItem
              key={item.label}
              onClick={() => router.push(item.path)}
            >
              <ItemContent>
                <item.Icon size={20} color="#4A4A68" />
                <Text.Body>{item.label}</Text.Body>
              </ItemContent>
              <Icon.ChevronRight size={20} color="#4A4A68" />
            </SettingsItem>
          ))}
        </TopSettings>
      </Settings>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AuthInfo = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.palette.primaryDark};
  transition: 0.5s ease;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 300px);
  width: 100%;
  margin-top: 300px;
  padding: 24px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.light};
  resize-mode: cover;
  object-fit: cover;
`;

const Circle = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 70%;
  z-index: -1;
`;

const CircleWhite = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 45%;
  z-index: -1;
`;

const TopSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.dark};
  width: 100%;
`;

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.dark};
  &:last-child {
    border-bottom: none;
  }

  cursor: pointer;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 12px;
`;

export default Profile;
