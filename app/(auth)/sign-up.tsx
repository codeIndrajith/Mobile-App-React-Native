import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useAuth, useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from 'react-native'

export default function Page() {
    const { signUp, fetchStatus } = useSignUp()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [formErrors, setFormErrors] = useState<any>({})
    const [globalError, setGlobalError] = useState<string | null>(null)

    const isLoading = fetchStatus === 'fetching'

    const handleClerkErrors = (err: any) => {
        const fieldErrors: any = {}
        let globalMsg: string | null = null

        if (err?.errors) {
            err.errors.forEach((e: any) => {
                const field = e.meta?.paramName

                if (field) {
                    fieldErrors[field] = {
                        message: e.message,
                    }
                } else {
                    globalMsg = e.message
                }
            })
        } else {
            globalMsg = 'Something went wrong. Please try again.'
        }

        setFormErrors(fieldErrors)
        setGlobalError(globalMsg)
    }

    const handleSubmit = async () => {
        setFormErrors({})
        setGlobalError(null)

        try {
            const res = await signUp.password({ emailAddress, password })

            if (res?.error) {
                handleClerkErrors(res.error)
                return
            }

            await signUp.verifications.sendEmailCode()
        } catch (err: any) {
            handleClerkErrors(err)
        }
    }

    const handleVerify = async () => {
        setFormErrors({})
        setGlobalError(null)

        try {
            const res = await signUp.verifications.verifyEmailCode({ code })

            if (res?.error) {
                handleClerkErrors(res.error)
                return
            }

            if (signUp.status === 'complete') {
                await signUp.finalize({
                    navigate: ({ decorateUrl }) => {
                        const url = decorateUrl('/(tabs)')
                        router.push(url as Href)
                    },
                })
            }
        } catch (err: any) {
            handleClerkErrors(err)
        }
    }

    if (signUp.status === 'complete' || isSignedIn) return null

    if (
        signUp.status === 'missing_requirements' &&
        signUp.unverifiedFields.includes('email_address') &&
        signUp.missingFields.length === 0
    ) {
        return (
            <ThemedView className="flex-1 px-6 pt-20">
                <View className="mb-10">
                    <ThemedText type="title" className="text-3xl font-bold mb-2">
                        Verify Email
                    </ThemedText>
                    <ThemedText className="opacity-60">
                        We've sent a 6-digit code to your inbox.
                    </ThemedText>
                </View>
                {globalError && (
                    <ThemedText className="text-red-500 text-sm mb-4">
                        {globalError}
                    </ThemedText>
                )}

                <View className="space-y-4">
                    <TextInput
                        className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-2xl text-lg text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700"
                        value={code}
                        placeholder="000000"
                        placeholderTextColor="#9ca3af"
                        onChangeText={setCode}
                        keyboardType="numeric"
                        maxLength={6}
                    />

                    {formErrors.code && (
                        <ThemedText className="text-red-500 text-sm ml-2">
                            {formErrors.code.message}
                        </ThemedText>
                    )}

                    <Pressable
                        onPress={handleVerify}
                        disabled={isLoading || code.length < 6}
                        className={`h-14 rounded-2xl items-center justify-center mt-4 ${isLoading || code.length < 6
                            ? 'bg-neutral-300 dark:bg-neutral-700'
                            : 'bg-black dark:bg-white'
                            }`}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="gray" />
                        ) : (
                            <ThemedText
                                className={`font-semibold text-lg ${!isLoading && code.length >= 6
                                    ? 'text-white dark:text-black'
                                    : 'text-neutral-500'
                                    }`}
                            >
                                Verify Account
                            </ThemedText>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={() => signUp.verifications.sendEmailCode()}
                        className="py-4 items-center"
                    >
                        <ThemedText type="link" className="font-medium">
                            Resend Code
                        </ThemedText>
                    </Pressable>
                </View>
            </ThemedView>
        )
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ThemedView className="flex-1 px-8 pt-24">
                    <View className="mb-12">
                        <ThemedText
                            type="title"
                            className="text-4xl font-extrabold tracking-tight mb-3"
                        >
                            Create Account
                        </ThemedText>
                        <ThemedText className="text-lg opacity-50">
                            Join us to get started.
                        </ThemedText>
                    </View>
                    {globalError && (
                        <ThemedText className="text-red-500 text-sm mb-4">
                            {globalError}
                        </ThemedText>
                    )}

                    <View className="space-y-6 gap-4">
                        <View>
                            <ThemedText className="text-md tracking-widest mb-2 ml-1">
                                Email Address
                            </ThemedText>
                            <TextInput
                                className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="name@example.com"
                                placeholderTextColor="#9ca3af"
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                            />
                            {formErrors.emailAddress && (
                                <ThemedText className="text-red-500 text-xs mt-1 ml-1">
                                    {formErrors.emailAddress.message}
                                </ThemedText>
                            )}
                        </View>

                        <View>
                            <ThemedText className="text-md tracking-widest mb-2 ml-1">
                                Password
                            </ThemedText>
                            <TextInput
                                className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                                value={password}
                                placeholder="••••••••"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                onChangeText={setPassword}
                            />
                            {formErrors.password && (
                                <ThemedText className="text-red-500 text-xs mt-1 ml-1">
                                    {formErrors.password.message}
                                </ThemedText>
                            )}
                        </View>

                        <Pressable
                            onPress={handleSubmit}
                            disabled={!emailAddress || !password || isLoading}
                            className={`h-16 rounded-2xl items-center justify-center mt-6 shadow-sm ${!emailAddress || !password || isLoading
                                ? 'bg-neutral-200 dark:bg-neutral-800'
                                : 'bg-blue-600'
                                }`}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <ThemedText className="text-white font-bold text-lg">
                                    Continue
                                </ThemedText>
                            )}
                        </Pressable>
                    </View>

                    <View className="flex-row justify-center mt-10">
                        <ThemedText className="opacity-60">
                            Already have an account?{' '}
                        </ThemedText>
                        <Link href="/sign-in">
                            <ThemedText type="link" className="font-bold">
                                Sign In
                            </ThemedText>
                        </Link>
                    </View>

                    <View nativeID="clerk-captcha" className="mt-4" />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}