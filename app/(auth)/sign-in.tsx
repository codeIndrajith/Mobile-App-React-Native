import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useSignIn } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from 'react-native'

export default function SignInPage() {
    // ✅ Exact destructure from Clerk Expo docs: signIn, errors, fetchStatus
    const { signIn, fetchStatus } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [formErrors, setFormErrors] = React.useState<any>({})
    const [globalError, setGlobalError] = React.useState<string | null>(null)
    const isLoading = fetchStatus === 'fetching'

    const handleClerkErrors = (err: any) => {
        const fieldErrors: any = {}
        let globalMsg: string | null = null

        if (err?.errors) {
            err.errors.forEach((e: any) => {
                const field = e.meta?.paramName
                if (field) {
                    fieldErrors[field] = { message: e.message }
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
        if (!signIn) return

        setFormErrors({})
        setGlobalError(null)

        try {
            const { error } = await signIn.password({ emailAddress, password })

            if (error) {
                handleClerkErrors(error)
                return
            }

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: () => router.push('/(tabs)' as any),
                })
            } else if (signIn.status === 'needs_client_trust') {
                const emailCodeFactor = signIn.supportedSecondFactors?.find(
                    (factor) => factor.strategy === 'email_code'
                )
                if (emailCodeFactor) {
                    await signIn.mfa.sendEmailCode()
                }
            }
        } catch (err: any) {
            handleClerkErrors(err)
        }
    }

    const handleVerify = async () => {
        if (!signIn) return

        setFormErrors({})
        setGlobalError(null)

        try {
            const { error } = await signIn.mfa.verifyEmailCode({ code })

            if (error) {
                handleClerkErrors(error)
                return
            }

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: () => router.push('/(tabs)' as any),
                })
            }
        } catch (err: any) {
            handleClerkErrors(err)
        }
    }

    if (!signIn) {
        return (
            <ThemedView className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </ThemedView>
        )
    }

    if (
        signIn.status === 'needs_second_factor' ||
        signIn.status === 'needs_client_trust'
    ) {
        return (
            <ThemedView className="flex-1 px-6 pt-20">
                <View className="mb-10">
                    <ThemedText type="title" className="text-3xl font-bold mb-2">
                        Two-Factor Auth
                    </ThemedText>

                    <ThemedText className="opacity-60 text-base leading-6">
                        Enter the verification code sent to your registered email address.
                    </ThemedText>
                </View>

                {globalError && (
                    <ThemedText
                        className="mb-4 text-center"
                        style={{ color: '#ef4444', fontSize: 13 }}
                    >
                        {globalError}
                    </ThemedText>
                )}

                <View className="space-y-4">
                    <TextInput
                        className="bg-neutral-100 dark:bg-neutral-800 p-5 rounded-2xl text-xl text-center font-bold tracking-widest text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700"
                        value={code}
                        placeholder="000 000"
                        placeholderTextColor="#9ca3af"
                        onChangeText={setCode}
                        keyboardType="numeric"
                        maxLength={6}
                        autoFocus
                    />

                    {formErrors.code && (
                        <ThemedText
                            className="text-center mt-2"
                            style={{ color: '#ef4444', fontSize: 13 }}
                        >
                            {formErrors.code.message}
                        </ThemedText>
                    )}

                    <Pressable
                        onPress={handleVerify}
                        disabled={isLoading || code.length < 6}
                        className={`h-14 rounded-2xl items-center justify-center mt-6 ${isLoading || code.length < 6
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
                                Verify & Sign In
                            </ThemedText>
                        )}
                    </Pressable>

                    <View className="mt-8 space-y-2">
                        <Pressable
                            onPress={() => signIn.mfa.sendEmailCode()}
                            className="py-2 items-center"
                        >
                            <ThemedText type="link" className="font-medium text-blue-500">
                                Resend Code
                            </ThemedText>
                        </Pressable>

                        <Pressable
                            onPress={() => signIn.reset()}
                            className="py-2 items-center"
                        >
                            <ThemedText className="opacity-40 text-sm font-medium">
                                Use a different account
                            </ThemedText>
                        </Pressable>
                    </View>
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
                            Welcome Back
                        </ThemedText>

                        <ThemedText className="text-lg opacity-50">
                            Sign in to continue your journey.
                        </ThemedText>
                    </View>

                    {globalError && (
                        <ThemedText
                            className="mb-4 text-center"
                            style={{ color: '#ef4444', fontSize: 13 }}
                        >
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
                                placeholder="name@domain.com"
                                placeholderTextColor="#9ca3af"
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                            />

                            {formErrors.emailAddress && (
                                <ThemedText
                                    className="mt-1 ml-1"
                                    style={{ color: '#ef4444', fontSize: 12 }}
                                >
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
                                <ThemedText
                                    className="mt-1 ml-1"
                                    style={{ color: '#ef4444', fontSize: 12 }}
                                >
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
                                    Sign In
                                </ThemedText>
                            )}
                        </Pressable>
                    </View>

                    <View className="flex-row justify-center mt-12">
                        <ThemedText className="opacity-60">New here? </ThemedText>

                        <Link href="/sign-up">
                            <ThemedText type="link" className="font-bold">
                                Create Account
                            </ThemedText>
                        </Link>
                    </View>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}