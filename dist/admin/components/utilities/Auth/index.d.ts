import React from 'react';
import { AuthContext } from './types';
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContext;
